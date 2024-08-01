/**
 * Copyright 
 *  (c) 2022 Whales Corp.
 *  (c) 2023 TrueCarry <truecarry@gmail.com>
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    Address,
    Cell,
    loadAccount,
    CurrencyCollection,
    Account,
    Contract,
    openContract,
    loadShardStateUnsplit,
    StateInit
} from "@ton/core";
import { LiteEngine } from "./engines/engine";
import { parseShards } from "./parser/parseShards";
import { Functions, liteServer_blockHeader, liteServer_transactionId, liteServer_transactionId3 } from "./schema";
import DataLoader from 'dataloader';
import { crc16 } from "./utils/crc16";
import { createLiteClientProvider } from "./liteClientProvider";
import { LRUMap } from 'lru_map';
import { AccountsDataLoaderKey, AllShardsResponse, BlockID, BlockLookupRequest, CacheMap, ClientAccountState, QueryArgs } from "./types";
import { findIntersection, findOnlyOnFirst } from "./utils/arrays";

const ZERO = 0n;

//
// Ops
//

const lookupBlockByID = async (engine: LiteEngine, props: { seqno: number, shard: string, workchain: number }, queryArgs?: QueryArgs) => {
    return await engine.query(Functions.liteServer_lookupBlock, {
        kind: 'liteServer.lookupBlock',
        mode: 1,
        id: {
            kind: 'tonNode.blockId',
            seqno: props.seqno,
            shard: props.shard,
            workchain: props.workchain
        },
        lt: null,
        utime: null
    }, queryArgs);
}

const lookupBlockByUtime = async (engine: LiteEngine, props: { shard: string, workchain: number, utime: number }, queryArgs?: QueryArgs) => {
    return await engine.query(Functions.liteServer_lookupBlock, {
        kind: 'liteServer.lookupBlock',
        mode: 4,
        id: {
            kind: 'tonNode.blockId',
            seqno: 0,
            shard: props.shard,
            workchain: props.workchain
        },
        lt: null,
        utime: props.utime
    }, queryArgs);
}

const lookupBlockByLt = async (engine: LiteEngine, props: { shard: string, workchain: number, lt: bigint }, queryArgs?: QueryArgs) => {
    return await engine.query(Functions.liteServer_lookupBlock, {
        kind: 'liteServer.lookupBlock',
        mode: 2,
        id: {
            kind: 'tonNode.blockId',
            seqno: 0,
            shard: props.shard,
            workchain: props.workchain
        },
        lt: props.lt.toString(),
        utime: null,
    }, queryArgs);
}

const getAllShardsInfo = async (engine: LiteEngine, props: BlockID, queryArgs?: QueryArgs) => {
    let res = (await engine.query(Functions.liteServer_getAllShardsInfo, { kind: 'liteServer.getAllShardsInfo', id: props }, queryArgs));
    let parsed = parseShards(Cell.fromBoc(res.data)[0].beginParse());
    let shards: { [key: string]: { [key: string]: number } } = {};
    for (let p of parsed) {
        shards[p[0].toString()] = {};
        for (let p2 of p[1]) {
            shards[p[0].toString()][p2[0]] = p2[1];
        }
    }
    return {
        id: res.id,
        shards,
        raw: res.data,
        proof: res.proof
    }
}

const getBlockHeader = async (engine: LiteEngine, props: BlockID, queryArgs?: QueryArgs) => {
    return await engine.query(Functions.liteServer_getBlockHeader, {
        kind: 'liteServer.getBlockHeader',
        mode: 1,
        id: {
            kind: 'tonNode.blockIdExt',
            seqno: props.seqno,
            shard: props.shard,
            workchain: props.workchain,
            rootHash: props.rootHash,
            fileHash: props.fileHash
        }
    }, queryArgs);
}

type MapKind = 'block' | 'header' | 'shard' | 'account'
function getCacheMap(mapKind: MapKind, mapOptions?: number | ((mapKind: MapKind) => CacheMap)): CacheMap {
    if (typeof mapOptions === 'function') {
        return mapOptions(mapKind)
    }

    if (typeof mapOptions === 'number') {
        return new LRUMap(mapOptions)
    }

    return new LRUMap(1000)
}

export class LiteClient {
    readonly engine: LiteEngine;
    #blockLockup: DataLoader<BlockLookupRequest, liteServer_blockHeader, string>;
    #shardsLockup: DataLoader<BlockID, AllShardsResponse, string>;
    #blockHeader: DataLoader<BlockID, liteServer_blockHeader, string>;
    #accounts: DataLoader<AccountsDataLoaderKey, ClientAccountState, string>;

    constructor(opts: {
        engine: LiteEngine,
        batchSize?: number | undefined | null,
        cacheMap?: number | ((mapKind: MapKind) => CacheMap)
    }) {
        this.engine = opts.engine;
        let batchSize = typeof opts.batchSize === 'number' ? opts.batchSize : 100;

        this.#blockLockup = new DataLoader(async (s) => {
            return await Promise.all(s.map((v) => {
                if (v.mode === 'utime') {
                    return lookupBlockByUtime(this.engine, v);
                }
                if (v.mode === 'lt') {
                    return lookupBlockByLt(this.engine, v);
                }
                return lookupBlockByID(this.engine, v);
            }));
        }, {
            maxBatchSize: batchSize, cacheKeyFn: (s) => {
                if (s.mode === 'id') {
                    return `block::${s.workchain}::${s.shard}::${s.seqno}`;
                } else if (s.mode === 'lt'){
                    return `block::${s.workchain}::${s.shard}::lt-${s.lt}`;
                } else {
                    return `block::${s.workchain}::${s.shard}::utime-${s.utime}`;
                }
            },
            cacheMap: getCacheMap('block', opts.cacheMap),
        });

        this.#blockHeader = new DataLoader(async (s) => {
            return await Promise.all(s.map((v) => getBlockHeader(this.engine, v)));
        }, {
            maxBatchSize: batchSize,
            cacheKeyFn: (s) => `header::${s.workchain}::${s.shard}::${s.seqno}`,
            cacheMap: getCacheMap('header', opts.cacheMap),
        });

        this.#shardsLockup = new DataLoader<BlockID, AllShardsResponse, string>(async (s) => {
            return await Promise.all(s.map((v) => getAllShardsInfo(this.engine, v)));
        }, {
            maxBatchSize: batchSize,
            cacheKeyFn: (s) => `shard::${s.workchain}::${s.shard}::${s.seqno}`,
            cacheMap: getCacheMap('shard', opts.cacheMap),
        });

        this.#accounts = new DataLoader<AccountsDataLoaderKey, ClientAccountState, string>(async (s) => {
            return await Promise.all(s.map((v) => this.getAccountStateRaw(v.address, {
                fileHash: v.fileHash,
                rootHash: v.rootHash,
                seqno: v.seqno,
                shard: v.shard,
                workchain: v.workchain,
            })));
        }, {
            maxBatchSize: batchSize,
            cacheKeyFn: (s) => `account::${s.workchain}::${s.shard}::${s.seqno}::${s.address.toRawString()}`,
            cacheMap: getCacheMap('account', opts.cacheMap),
        });
    }


    /**
     * Open a contract
     * @param contract
     */
    open<T extends Contract>(contract: T) {
        return openContract<T>(contract, (args) =>
            createLiteClientProvider(this, null, args.address, args.init)
        )
    }

    /**
     * Create a new contract provider
     * @param address
     * @param init
     */
    provider(address: Address, init?: StateInit | null) {
        return createLiteClientProvider(this, null, address, init ?? null)
    }

    //
    // Sending
    //

    sendMessage = async (src: Buffer) => {
        let res = await this.engine.query(Functions.liteServer_sendMessage, { kind: 'liteServer.sendMessage', body: src }, { timeout: 5000 });
        return {
            status: res.status
        };
    }

    //
    // State
    //

    getMasterchainInfo = async (queryArgs?: QueryArgs) => {
        return this.engine.query(Functions.liteServer_getMasterchainInfo, { kind: 'liteServer.masterchainInfo' }, queryArgs);
    }

    getMasterchainInfoExt = async (queryArgs?: QueryArgs) => {
        return this.engine.query(Functions.liteServer_getMasterchainInfoExt, { kind: 'liteServer.masterchainInfoExt', mode: 0 }, queryArgs);
    }

    getCurrentTime = async (queryArgs?: QueryArgs) => {
        return (await this.engine.query(Functions.liteServer_getTime, { kind: 'liteServer.getTime' }, queryArgs)).now;
    }

    getVersion = async (queryArgs?: QueryArgs) => {
        return (await this.engine.query(Functions.liteServer_getVersion, { kind: 'liteServer.getVersion' }, queryArgs));
    }

    getConfig = async (block: BlockID, queryArgs?: QueryArgs) => {
        let res = await this.engine.query(Functions.liteServer_getConfigAll, {
            kind: 'liteServer.getConfigAll',
            id: {
                kind: 'tonNode.blockIdExt',
                seqno: block.seqno,
                shard: block.shard,
                workchain: block.workchain,
                fileHash: block.fileHash,
                rootHash: block.rootHash
            },
            mode: 0
        }, queryArgs);

        const configProof = Cell.fromBoc(res.configProof)[0];
        const configCell = configProof.refs[0];
        const cs = configCell.beginParse();
        let shardState = loadShardStateUnsplit(cs);
        if (!shardState.extras) {
            throw Error('Invalid response');
        }
        return shardState.extras;
    };

    //
    // Account
    //

    getAccountState = async (src: Address, block: BlockID): Promise<ClientAccountState> => {
        return this.#accounts.load({
            address: src,
            seqno: block.seqno,
            shard: block.shard,
            workchain: block.workchain,
            fileHash: block.fileHash,
            rootHash: block.rootHash
        })
    }

    getAccountStateRaw = async (src: Address, block: BlockID, queryArgs?: QueryArgs): Promise<ClientAccountState> => {
        let res = await this.engine.query(Functions.liteServer_getAccountState, {
            kind: 'liteServer.getAccountState',
            id: {
                kind: 'tonNode.blockIdExt',
                seqno: block.seqno,
                shard: block.shard,
                workchain: block.workchain,
                fileHash: block.fileHash,
                rootHash: block.rootHash
            },
            account: {
                kind: 'liteServer.accountId',
                workchain: src.workChain,
                id: src.hash
            }
        }, queryArgs);

        let account: Account | null = null
        let balance: CurrencyCollection = { coins: ZERO };
        let lastTx: { lt: bigint, hash: bigint } | null = null;
        if (res.state.length > 0) {
            const accountSlice = Cell.fromBoc(res.state)[0].asSlice()
            if (accountSlice.loadBit()) {
                account = loadAccount(accountSlice);
                if (account) {
                    balance = account.storage.balance;
                    let shardState = loadShardStateUnsplit(Cell.fromBoc(res.proof)[1].refs[0].beginParse());
                    let hashId = BigInt('0x' + src.hash.toString('hex'))
                    if (shardState.accounts) {
                        let pstate = shardState.accounts.get(hashId);
                        if (pstate) {
                            lastTx = { hash: pstate.shardAccount.lastTransactionHash, lt: pstate.shardAccount.lastTransactionLt };
                        }
                    }
                }
            }
        }

        return {
            state: account,
            lastTx,
            balance,
            raw: res.state,
            proof: res.proof,
            block: res.id,
            shardBlock: res.shardblk,
            shardProof: res.shardProof
        }
    }

    getAccountStatePrunned = async (src: Address, block: BlockID, queryArgs?: QueryArgs) => {
        let res = (await this.engine.query(Functions.liteServer_getAccountStatePrunned, {
            kind: 'liteServer.getAccountStatePrunned',
            id: {
                kind: 'tonNode.blockIdExt',
                seqno: block.seqno,
                shard: block.shard,
                workchain: block.workchain,
                fileHash: block.fileHash,
                rootHash: block.rootHash
            },
            account: {
                kind: 'liteServer.accountId',
                workchain: src.workChain,
                id: src.hash
            }
        }, queryArgs));

        let stateHash: Buffer | null = null;
        if (res.state.length > 0) {
            let stateCell = Cell.fromBoc(res.state)[0];
            if (!stateCell.isExotic) {
                throw new Error('Prunned state is not exotic');
            }
            stateHash = Cell.fromBoc(res.state)[0].bits.subbuffer(8, 256)
        }

        return {
            stateHash,
            raw: res.state,
            proof: res.proof,
            block: res.id,
            shardBlock: res.shardblk,
            shardProof: res.shardProof
        }
    }

    getAccountTransaction = async (src: Address, lt: string, block: BlockID, queryArgs?: QueryArgs) => {
        return await this.engine.query(Functions.liteServer_getOneTransaction, {
            kind: 'liteServer.getOneTransaction',
            id: block,
            account: {
                kind: 'liteServer.accountId',
                workchain: src.workChain,
                id: src.hash
            },
            lt: lt
        }, queryArgs);
    }

    getAccountTransactions = async (src: Address, lt: string, hash: Buffer, count: number, queryArgs?: QueryArgs) => {
        let loaded = await this.engine.query(Functions.liteServer_getTransactions, {
            kind: 'liteServer.getTransactions',
            count,
            account: {
                kind: 'liteServer.accountId',
                workchain: src.workChain,
                id: src.hash
            },
            lt: lt,
            hash: hash
        }, queryArgs);
        return {
            ids: loaded.ids,
            transactions: loaded.transactions
        };
    }

    runMethod = async (src: Address, method: string, params: Buffer, block: BlockID, queryArgs?: QueryArgs) => {
        let res = await this.engine.query(Functions.liteServer_runSmcMethod, {
            kind: 'liteServer.runSmcMethod',
            mode: 4,
            id: {
                kind: 'tonNode.blockIdExt',
                seqno: block.seqno,
                shard: block.shard,
                workchain: block.workchain,
                rootHash: block.rootHash,
                fileHash: block.fileHash
            },
            account: {
                kind: 'liteServer.accountId',
                workchain: src.workChain,
                id: src.hash
            },
            methodId: ((crc16(method) & 0xffff) | 0x10000) + '',
            params
        }, queryArgs);
        return {
            exitCode: res.exitCode,
            result: res.result ? res.result.toString('base64') : null,
            block: {
                seqno: res.id.seqno,
                shard: res.id.shard,
                workchain: res.id.workchain,
                rootHash: res.id.rootHash,
                fileHash: res.id.fileHash
            },
            shardBlock: {
                seqno: res.shardblk.seqno,
                shard: res.shardblk.shard,
                workchain: res.shardblk.workchain,
                rootHash: res.shardblk.rootHash,
                fileHash: res.shardblk.fileHash
            },
        }
    }

    //
    // Block
    //

    lookupBlockByID = async (block: { seqno: number, shard: string, workchain: number }) => {
        return await this.#blockLockup.load({ ...block, mode: 'id' });
    }

    lookupBlockByUtime = async (block: { shard: string, workchain: number, utime: number }) => {
        return await this.#blockLockup.load({ ...block, mode: 'utime' });
    }

    lookupBlockByLt = async (block: { shard: string, workchain: number, lt: bigint }) => {
        return await this.#blockLockup.load({ ...block, mode: 'lt' });
    }

    getBlockHeader = async (block: BlockID) => {
        return this.#blockHeader.load(block);
    }

    getAllShardsInfo = async (block: BlockID) => {
        return this.#shardsLockup.load(block);
    }

    listBlockTransactions = async (block: BlockID, args?: {
        mode: number,
        count: number,
        after?: liteServer_transactionId3 | null | undefined,
        wantProof?: boolean
    }, queryArgs?: QueryArgs) => {

        let mode = args?.mode || 1 + 2 + 4;
        let count = args?.count || 100;
        let after: liteServer_transactionId3 | null = args && args.after ? args.after : null;

        return await this.engine.query(Functions.liteServer_listBlockTransactions, {
            kind: 'liteServer.listBlockTransactions',
            id: {
                kind: 'tonNode.blockIdExt',
                seqno: block.seqno,
                shard: block.shard,
                workchain: block.workchain,
                rootHash: block.rootHash,
                fileHash: block.fileHash
            },
            mode,
            count,
            reverseOrder: null,
            after,
            wantProof: null
        }, queryArgs);
    }

    listBlockTransactionsExt = async (block: BlockID, args?: {
        mode: number,
        count: number,
        after?: liteServer_transactionId3 | null | undefined,
        wantProof?: boolean
    }, queryArgs?: QueryArgs) => {

        let mode = args?.mode || 1 + 2 + 4;
        let count = args?.count || 100;
        let after: liteServer_transactionId3 | null = args && args.after ? args.after : null;

        return await this.engine.query(Functions.liteServer_listBlockTransactionsExt, {
            kind: 'liteServer.listBlockTransactionsExt',
            id: {
                kind: 'tonNode.blockIdExt',
                seqno: block.seqno,
                shard: block.shard,
                workchain: block.workchain,
                rootHash: block.rootHash,
                fileHash: block.fileHash
            },
            mode,
            count,
            reverseOrder: null,
            after,
            wantProof: null
        }, queryArgs);
    }

    getFullBlock = async (seqno: number) => {

        // MC Blocks
        let [mcBlockId, mcBlockPrevId] = await Promise.all([
            this.lookupBlockByID({ workchain: -1, shard: '-9223372036854775808', seqno: seqno }),
            this.lookupBlockByID({ workchain: -1, shard: '-9223372036854775808', seqno: seqno - 1 })
        ]);

        // Shards
        let [mcShards, mcShardsPrev] = await Promise.all([
            this.getAllShardsInfo(mcBlockId.id),
            this.getAllShardsInfo(mcBlockPrevId.id)
        ]);

        // Extract shards
        let shards: {
            workchain: number,
            seqno: number,
            shard: string
        }[] = [];
        shards.push({ seqno, workchain: -1, shard: '-9223372036854775808' });

        // Extract shards
        for (let wcs in mcShards.shards) {
            let wc = parseInt(wcs, 10);
            let currShards = mcShards.shards[wcs];
            let prevShards = mcShardsPrev.shards[wcs] || {};

            const currShardIds = Object.keys(currShards);
            const prevShardIds = Object.keys(prevShards);

            const bothBlockShards = findIntersection(currShardIds, prevShardIds);
            const currBlockShards = findOnlyOnFirst(currShardIds, prevShardIds);
            // const prevBlockShards = findElementsInArray1NotInArray2(prevShardIds, currShardIds)

            // If shard is present in both blocks - add difference
            for (let shs of bothBlockShards) {
                let seqno = currShards[shs];
                let prevSeqno = prevShards[shs] || seqno;
                for (let s = prevSeqno + 1; s <= seqno; s++) {
                    shards.push({ seqno: s, workchain: wc, shard: shs });
                }
            }

            // Shards present only in current block, just add them to list
            // todo: check if prev shard block exists?
            for (const shs of currBlockShards) {
                shards.push({ seqno: currShards[shs], workchain: wc, shard: shs });
            }

            // Shards present only in prev block.
            // todo: check if newer blocks for given shards are present
            // for (const shs of prevBlockShards) {
            //     shards.push({ seqno: currShards[shs], workchain: wc, shard: shs });
            // }
        }

        // Fetch transactions and blocks
        let shards2 = await Promise.all(shards.map(async (shard) => {
            let blockId = await this.lookupBlockByID(shard);
            let transactions: liteServer_transactionId[] = [];
            let after: liteServer_transactionId3 | null = null;
            while (true) {
                let tr = await this.listBlockTransactions(blockId.id, {
                    count: 128,
                    mode: 1 + 2 + 4 + (after ? 128 : 0),
                    after
                });
                for (let t of tr.ids) {
                    transactions.push(t);
                }
                if (!tr.incomplete) {
                    break;
                }
                after = { kind: 'liteServer.transactionId3', account: tr.ids[tr.ids.length - 1].account!, lt: tr.ids[tr.ids.length - 1].lt! } as liteServer_transactionId3;
            }
            let mapped = transactions.map((t) => ({ hash: t.hash!, lt: t.lt!, account: t.account! }));

            return {
                ...shard,
                rootHash: blockId.id.rootHash,
                fileHash: blockId.id.fileHash,
                transactions: mapped
            }
        }));

        return {
            shards: shards2
        };
    }

    getLibraries = async (hashes: Buffer[], queryArgs?: QueryArgs) => {
        return this.engine.query(Functions.liteServer_getLibraries, {
            kind: 'liteServer.getLibraries',
            libraryList: hashes
        }, queryArgs)
    }
}
