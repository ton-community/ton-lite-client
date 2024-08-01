/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TLWriteBuffer, TLReadBuffer, TLFlag, TLInt, TLString, TLLong, TLInt256, TLInt128, TLBytes, TLBool, TLCodec, TLFunction } from "ton-tl";

//
// Constructors
//

export interface tonNode_blockId {
    readonly kind: 'tonNode.blockId';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly seqno: TLInt;
}

export interface tonNode_blockIdExt {
    readonly kind: 'tonNode.blockIdExt';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly seqno: TLInt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
}

export interface tonNode_zeroStateIdExt {
    readonly kind: 'tonNode.zeroStateIdExt';
    readonly workchain: TLInt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
}

export interface adnl_message_query {
    readonly kind: 'adnl.message.query';
    readonly queryId: TLInt256;
    readonly query: TLBytes;
}

export interface adnl_message_answer {
    readonly kind: 'adnl.message.answer';
    readonly queryId: TLInt256;
    readonly answer: TLBytes;
}

export interface liteServer_error {
    readonly kind: 'liteServer.error';
    readonly code: TLInt;
    readonly message: TLString;
}

export interface liteServer_accountId {
    readonly kind: 'liteServer.accountId';
    readonly workchain: TLInt;
    readonly id: TLInt256;
}

export interface liteServer_libraryEntry {
    readonly kind: 'liteServer.libraryEntry';
    readonly hash: TLInt256;
    readonly data: TLBytes;
}

export interface liteServer_masterchainInfo {
    readonly kind: 'liteServer.masterchainInfo';
    readonly last: tonNode_blockIdExt;
    readonly stateRootHash: TLInt256;
    readonly init: tonNode_zeroStateIdExt;
}

export interface liteServer_masterchainInfoExt {
    readonly kind: 'liteServer.masterchainInfoExt';
    readonly mode: TLFlag;
    readonly version: TLInt;
    readonly capabilities: TLLong;
    readonly last: tonNode_blockIdExt;
    readonly lastUtime: TLInt;
    readonly now: TLInt;
    readonly stateRootHash: TLInt256;
    readonly init: tonNode_zeroStateIdExt;
}

export interface liteServer_currentTime {
    readonly kind: 'liteServer.currentTime';
    readonly now: TLInt;
}

export interface liteServer_version {
    readonly kind: 'liteServer.version';
    readonly mode: TLFlag;
    readonly version: TLInt;
    readonly capabilities: TLLong;
    readonly now: TLInt;
}

export interface liteServer_blockData {
    readonly kind: 'liteServer.blockData';
    readonly id: tonNode_blockIdExt;
    readonly data: TLBytes;
}

export interface liteServer_blockState {
    readonly kind: 'liteServer.blockState';
    readonly id: tonNode_blockIdExt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
    readonly data: TLBytes;
}

export interface liteServer_blockHeader {
    readonly kind: 'liteServer.blockHeader';
    readonly id: tonNode_blockIdExt;
    readonly mode: TLFlag;
    readonly headerProof: TLBytes;
}

export interface liteServer_sendMsgStatus {
    readonly kind: 'liteServer.sendMsgStatus';
    readonly status: TLInt;
}

export interface liteServer_accountState {
    readonly kind: 'liteServer.accountState';
    readonly id: tonNode_blockIdExt;
    readonly shardblk: tonNode_blockIdExt;
    readonly shardProof: TLBytes;
    readonly proof: TLBytes;
    readonly state: TLBytes;
}

export interface liteServer_runMethodResult {
    readonly kind: 'liteServer.runMethodResult';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly shardblk: tonNode_blockIdExt;
    readonly shardProof: TLBytes | null;
    readonly proof: TLBytes | null;
    readonly stateProof: TLBytes | null;
    readonly initC7: TLBytes | null;
    readonly libExtras: TLBytes | null;
    readonly exitCode: TLInt;
    readonly result: TLBytes | null;
}

export interface liteServer_shardInfo {
    readonly kind: 'liteServer.shardInfo';
    readonly id: tonNode_blockIdExt;
    readonly shardblk: tonNode_blockIdExt;
    readonly shardProof: TLBytes;
    readonly shardDescr: TLBytes;
}

export interface liteServer_allShardsInfo {
    readonly kind: 'liteServer.allShardsInfo';
    readonly id: tonNode_blockIdExt;
    readonly proof: TLBytes;
    readonly data: TLBytes;
}

export interface liteServer_transactionInfo {
    readonly kind: 'liteServer.transactionInfo';
    readonly id: tonNode_blockIdExt;
    readonly proof: TLBytes;
    readonly transaction: TLBytes;
}

export interface liteServer_transactionList {
    readonly kind: 'liteServer.transactionList';
    readonly ids: tonNode_blockIdExt[];
    readonly transactions: TLBytes;
}

export interface liteServer_transactionId {
    readonly kind: 'liteServer.transactionId';
    readonly mode: TLFlag;
    readonly account: TLInt256 | null;
    readonly lt: TLLong | null;
    readonly hash: TLInt256 | null;
}

export interface liteServer_transactionId3 {
    readonly kind: 'liteServer.transactionId3';
    readonly account: TLInt256;
    readonly lt: TLLong;
}

export interface liteServer_blockTransactions {
    readonly kind: 'liteServer.blockTransactions';
    readonly id: tonNode_blockIdExt;
    readonly reqCount: TLFlag;
    readonly incomplete: TLBool;
    readonly ids: liteServer_transactionId[];
    readonly proof: TLBytes;
}

export interface liteServer_blockTransactionsExt {
    readonly kind: 'liteServer.blockTransactionsExt';
    readonly id: tonNode_blockIdExt;
    readonly reqCount: TLFlag;
    readonly incomplete: TLBool;
    readonly transactions: TLBytes;
    readonly proof: TLBytes;
}

export interface liteServer_signature {
    readonly kind: 'liteServer.signature';
    readonly nodeIdShort: TLInt256;
    readonly signature: TLBytes;
}

export interface liteServer_signatureSet {
    readonly kind: 'liteServer.signatureSet';
    readonly validatorSetHash: TLInt;
    readonly catchainSeqno: TLInt;
    readonly signatures: liteServer_signature[];
}

export interface liteServer_blockLinkBack {
    readonly kind: 'liteServer.blockLinkBack';
    readonly toKeyBlock: TLBool;
    readonly from: tonNode_blockIdExt;
    readonly to: tonNode_blockIdExt;
    readonly destProof: TLBytes;
    readonly proof: TLBytes;
    readonly stateProof: TLBytes;
}

export interface liteServer_blockLinkForward {
    readonly kind: 'liteServer.blockLinkForward';
    readonly toKeyBlock: TLBool;
    readonly from: tonNode_blockIdExt;
    readonly to: tonNode_blockIdExt;
    readonly destProof: TLBytes;
    readonly configProof: TLBytes;
    readonly signatures: liteServer_SignatureSet;
}

export interface liteServer_partialBlockProof {
    readonly kind: 'liteServer.partialBlockProof';
    readonly complete: TLBool;
    readonly from: tonNode_blockIdExt;
    readonly to: tonNode_blockIdExt;
    readonly steps: liteServer_BlockLink[];
}

export interface liteServer_configInfo {
    readonly kind: 'liteServer.configInfo';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly stateProof: TLBytes;
    readonly configProof: TLBytes;
}

export interface liteServer_validatorStats {
    readonly kind: 'liteServer.validatorStats';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly count: TLInt;
    readonly complete: TLBool;
    readonly stateProof: TLBytes;
    readonly dataProof: TLBytes;
}

export interface liteServer_libraryResult {
    readonly kind: 'liteServer.libraryResult';
    readonly result: liteServer_libraryEntry[];
}

export interface liteServer_shardBlockLink {
    readonly kind: 'liteServer.shardBlockLink';
    readonly id: tonNode_blockIdExt;
    readonly proof: TLBytes;
}

export interface liteServer_shardBlockProof {
    readonly kind: 'liteServer.shardBlockProof';
    readonly masterchainId: tonNode_blockIdExt;
    readonly links: liteServer_shardBlockLink[];
}

export interface liteServer_debug_verbosity {
    readonly kind: 'liteServer.debug.verbosity';
    readonly value: TLInt;
}

//
// Types
//

export type tonNode_BlockId = tonNode_blockId;

export type tonNode_BlockIdExt = tonNode_blockIdExt;

export type tonNode_ZeroStateIdExt = tonNode_zeroStateIdExt;

export type adnl_Message = adnl_message_query | adnl_message_answer;

export type liteServer_Error = liteServer_error;

export type liteServer_AccountId = liteServer_accountId;

export type liteServer_LibraryEntry = liteServer_libraryEntry;

export type liteServer_MasterchainInfo = liteServer_masterchainInfo;

export type liteServer_MasterchainInfoExt = liteServer_masterchainInfoExt;

export type liteServer_CurrentTime = liteServer_currentTime;

export type liteServer_Version = liteServer_version;

export type liteServer_BlockData = liteServer_blockData;

export type liteServer_BlockState = liteServer_blockState;

export type liteServer_BlockHeader = liteServer_blockHeader;

export type liteServer_SendMsgStatus = liteServer_sendMsgStatus;

export type liteServer_AccountState = liteServer_accountState;

export type liteServer_RunMethodResult = liteServer_runMethodResult;

export type liteServer_ShardInfo = liteServer_shardInfo;

export type liteServer_AllShardsInfo = liteServer_allShardsInfo;

export type liteServer_TransactionInfo = liteServer_transactionInfo;

export type liteServer_TransactionList = liteServer_transactionList;

export type liteServer_TransactionId = liteServer_transactionId;

export type liteServer_TransactionId3 = liteServer_transactionId3;

export type liteServer_BlockTransactions = liteServer_blockTransactions;

export type liteServer_BlockTransactionsExt = liteServer_blockTransactionsExt;

export type liteServer_Signature = liteServer_signature;

export type liteServer_SignatureSet = liteServer_signatureSet;

export type liteServer_BlockLink = liteServer_blockLinkBack | liteServer_blockLinkForward;

export type liteServer_PartialBlockProof = liteServer_partialBlockProof;

export type liteServer_ConfigInfo = liteServer_configInfo;

export type liteServer_ValidatorStats = liteServer_validatorStats;

export type liteServer_LibraryResult = liteServer_libraryResult;

export type liteServer_ShardBlockLink = liteServer_shardBlockLink;

export type liteServer_ShardBlockProof = liteServer_shardBlockProof;

export type liteServer_debug_Verbosity = liteServer_debug_verbosity;

//
// Functions
//

export interface liteServer_getMasterchainInfo {
    readonly kind: 'liteServer.getMasterchainInfo';
}

export interface liteServer_getMasterchainInfoExt {
    readonly kind: 'liteServer.getMasterchainInfoExt';
    readonly mode: TLFlag;
}

export interface liteServer_getTime {
    readonly kind: 'liteServer.getTime';
}

export interface liteServer_getVersion {
    readonly kind: 'liteServer.getVersion';
}

export interface liteServer_getBlock {
    readonly kind: 'liteServer.getBlock';
    readonly id: tonNode_blockIdExt;
}

export interface liteServer_getState {
    readonly kind: 'liteServer.getState';
    readonly id: tonNode_blockIdExt;
}

export interface liteServer_getBlockHeader {
    readonly kind: 'liteServer.getBlockHeader';
    readonly id: tonNode_blockIdExt;
    readonly mode: TLFlag;
}

export interface liteServer_sendMessage {
    readonly kind: 'liteServer.sendMessage';
    readonly body: TLBytes;
}

export interface liteServer_getAccountState {
    readonly kind: 'liteServer.getAccountState';
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
}

export interface liteServer_getAccountStatePrunned {
    readonly kind: 'liteServer.getAccountStatePrunned';
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
}

export interface liteServer_runSmcMethod {
    readonly kind: 'liteServer.runSmcMethod';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
    readonly methodId: TLLong;
    readonly params: TLBytes;
}

export interface liteServer_getShardInfo {
    readonly kind: 'liteServer.getShardInfo';
    readonly id: tonNode_blockIdExt;
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly exact: TLBool;
}

export interface liteServer_getAllShardsInfo {
    readonly kind: 'liteServer.getAllShardsInfo';
    readonly id: tonNode_blockIdExt;
}

export interface liteServer_getOneTransaction {
    readonly kind: 'liteServer.getOneTransaction';
    readonly id: tonNode_blockIdExt;
    readonly account: liteServer_accountId;
    readonly lt: TLLong;
}

export interface liteServer_getTransactions {
    readonly kind: 'liteServer.getTransactions';
    readonly count: TLFlag;
    readonly account: liteServer_accountId;
    readonly lt: TLLong;
    readonly hash: TLInt256;
}

export interface liteServer_lookupBlock {
    readonly kind: 'liteServer.lookupBlock';
    readonly mode: TLFlag;
    readonly id: tonNode_blockId;
    readonly lt: TLLong | null;
    readonly utime: TLInt | null;
}

export interface liteServer_listBlockTransactions {
    readonly kind: 'liteServer.listBlockTransactions';
    readonly id: tonNode_blockIdExt;
    readonly mode: TLFlag;
    readonly count: TLFlag;
    readonly after: liteServer_transactionId3 | null;
    readonly reverseOrder: TLBool | null;
    readonly wantProof: TLBool | null;
}

export interface liteServer_listBlockTransactionsExt {
    readonly kind: 'liteServer.listBlockTransactionsExt';
    readonly id: tonNode_blockIdExt;
    readonly mode: TLFlag;
    readonly count: TLFlag;
    readonly after: liteServer_transactionId3 | null;
    readonly reverseOrder: TLBool | null;
    readonly wantProof: TLBool | null;
}

export interface liteServer_getBlockProof {
    readonly kind: 'liteServer.getBlockProof';
    readonly mode: TLFlag;
    readonly knownBlock: tonNode_blockIdExt;
    readonly targetBlock: tonNode_blockIdExt | null;
}

export interface liteServer_getConfigAll {
    readonly kind: 'liteServer.getConfigAll';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
}

export interface liteServer_getConfigParams {
    readonly kind: 'liteServer.getConfigParams';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly paramList: TLInt[];
}

export interface liteServer_getValidatorStats {
    readonly kind: 'liteServer.getValidatorStats';
    readonly mode: TLFlag;
    readonly id: tonNode_blockIdExt;
    readonly limit: TLInt;
    readonly startAfter: TLInt256 | null;
    readonly modifiedAfter: TLInt | null;
}

export interface liteServer_getLibraries {
    readonly kind: 'liteServer.getLibraries';
    readonly libraryList: TLInt256[];
}

export interface liteServer_getShardBlockProof {
    readonly kind: 'liteServer.getShardBlockProof';
    readonly id: tonNode_blockIdExt;
}

export interface liteServer_queryPrefix {
    readonly kind: 'liteServer.queryPrefix';
}

export interface liteServer_query {
    readonly kind: 'liteServer.query';
    readonly data: TLBytes;
}

export interface liteServer_waitMasterchainSeqno {
    readonly kind: 'liteServer.waitMasterchainSeqno';
    readonly seqno: TLInt;
    readonly timeoutMs: TLInt;
}


export const Functions = {
    liteServer_getMasterchainInfo: {
        encodeRequest: (src: liteServer_getMasterchainInfo, encoder: TLWriteBuffer) => { encoder.writeInt32(-1984567762); Codecs.liteServer_getMasterchainInfo.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_MasterchainInfo.decode(decoder)
    } as TLFunction<liteServer_getMasterchainInfo, liteServer_MasterchainInfo>,

    liteServer_getMasterchainInfoExt: {
        encodeRequest: (src: liteServer_getMasterchainInfoExt, encoder: TLWriteBuffer) => { encoder.writeInt32(1889956319); Codecs.liteServer_getMasterchainInfoExt.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_MasterchainInfoExt.decode(decoder)
    } as TLFunction<liteServer_getMasterchainInfoExt, liteServer_MasterchainInfoExt>,

    liteServer_getTime: {
        encodeRequest: (src: liteServer_getTime, encoder: TLWriteBuffer) => { encoder.writeInt32(380459572); Codecs.liteServer_getTime.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_CurrentTime.decode(decoder)
    } as TLFunction<liteServer_getTime, liteServer_CurrentTime>,

    liteServer_getVersion: {
        encodeRequest: (src: liteServer_getVersion, encoder: TLWriteBuffer) => { encoder.writeInt32(590058507); Codecs.liteServer_getVersion.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_Version.decode(decoder)
    } as TLFunction<liteServer_getVersion, liteServer_Version>,

    liteServer_getBlock: {
        encodeRequest: (src: liteServer_getBlock, encoder: TLWriteBuffer) => { encoder.writeInt32(1668796173); Codecs.liteServer_getBlock.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_BlockData.decode(decoder)
    } as TLFunction<liteServer_getBlock, liteServer_BlockData>,

    liteServer_getState: {
        encodeRequest: (src: liteServer_getState, encoder: TLWriteBuffer) => { encoder.writeInt32(-1167184202); Codecs.liteServer_getState.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_BlockState.decode(decoder)
    } as TLFunction<liteServer_getState, liteServer_BlockState>,

    liteServer_getBlockHeader: {
        encodeRequest: (src: liteServer_getBlockHeader, encoder: TLWriteBuffer) => { encoder.writeInt32(569116318); Codecs.liteServer_getBlockHeader.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_BlockHeader.decode(decoder)
    } as TLFunction<liteServer_getBlockHeader, liteServer_BlockHeader>,

    liteServer_sendMessage: {
        encodeRequest: (src: liteServer_sendMessage, encoder: TLWriteBuffer) => { encoder.writeInt32(1762317442); Codecs.liteServer_sendMessage.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_SendMsgStatus.decode(decoder)
    } as TLFunction<liteServer_sendMessage, liteServer_SendMsgStatus>,

    liteServer_getAccountState: {
        encodeRequest: (src: liteServer_getAccountState, encoder: TLWriteBuffer) => { encoder.writeInt32(1804144165); Codecs.liteServer_getAccountState.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_AccountState.decode(decoder)
    } as TLFunction<liteServer_getAccountState, liteServer_AccountState>,

    liteServer_getAccountStatePrunned: {
        encodeRequest: (src: liteServer_getAccountStatePrunned, encoder: TLWriteBuffer) => { encoder.writeInt32(1516864775); Codecs.liteServer_getAccountStatePrunned.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_AccountState.decode(decoder)
    } as TLFunction<liteServer_getAccountStatePrunned, liteServer_AccountState>,

    liteServer_runSmcMethod: {
        encodeRequest: (src: liteServer_runSmcMethod, encoder: TLWriteBuffer) => { encoder.writeInt32(1556504018); Codecs.liteServer_runSmcMethod.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_RunMethodResult.decode(decoder)
    } as TLFunction<liteServer_runSmcMethod, liteServer_RunMethodResult>,

    liteServer_getShardInfo: {
        encodeRequest: (src: liteServer_getShardInfo, encoder: TLWriteBuffer) => { encoder.writeInt32(1185084453); Codecs.liteServer_getShardInfo.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_ShardInfo.decode(decoder)
    } as TLFunction<liteServer_getShardInfo, liteServer_ShardInfo>,

    liteServer_getAllShardsInfo: {
        encodeRequest: (src: liteServer_getAllShardsInfo, encoder: TLWriteBuffer) => { encoder.writeInt32(1960050027); Codecs.liteServer_getAllShardsInfo.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_AllShardsInfo.decode(decoder)
    } as TLFunction<liteServer_getAllShardsInfo, liteServer_AllShardsInfo>,

    liteServer_getOneTransaction: {
        encodeRequest: (src: liteServer_getOneTransaction, encoder: TLWriteBuffer) => { encoder.writeInt32(-737205014); Codecs.liteServer_getOneTransaction.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_TransactionInfo.decode(decoder)
    } as TLFunction<liteServer_getOneTransaction, liteServer_TransactionInfo>,

    liteServer_getTransactions: {
        encodeRequest: (src: liteServer_getTransactions, encoder: TLWriteBuffer) => { encoder.writeInt32(474015649); Codecs.liteServer_getTransactions.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_TransactionList.decode(decoder)
    } as TLFunction<liteServer_getTransactions, liteServer_TransactionList>,

    liteServer_lookupBlock: {
        encodeRequest: (src: liteServer_lookupBlock, encoder: TLWriteBuffer) => { encoder.writeInt32(-87492834); Codecs.liteServer_lookupBlock.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_BlockHeader.decode(decoder)
    } as TLFunction<liteServer_lookupBlock, liteServer_BlockHeader>,

    liteServer_listBlockTransactions: {
        encodeRequest: (src: liteServer_listBlockTransactions, encoder: TLWriteBuffer) => { encoder.writeInt32(-1375942694); Codecs.liteServer_listBlockTransactions.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_BlockTransactions.decode(decoder)
    } as TLFunction<liteServer_listBlockTransactions, liteServer_BlockTransactions>,

    liteServer_listBlockTransactionsExt: {
        encodeRequest: (src: liteServer_listBlockTransactionsExt, encoder: TLWriteBuffer) => { encoder.writeInt32(7986524); Codecs.liteServer_listBlockTransactionsExt.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_BlockTransactionsExt.decode(decoder)
    } as TLFunction<liteServer_listBlockTransactionsExt, liteServer_BlockTransactionsExt>,

    liteServer_getBlockProof: {
        encodeRequest: (src: liteServer_getBlockProof, encoder: TLWriteBuffer) => { encoder.writeInt32(-1964336060); Codecs.liteServer_getBlockProof.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_PartialBlockProof.decode(decoder)
    } as TLFunction<liteServer_getBlockProof, liteServer_PartialBlockProof>,

    liteServer_getConfigAll: {
        encodeRequest: (src: liteServer_getConfigAll, encoder: TLWriteBuffer) => { encoder.writeInt32(-1860491593); Codecs.liteServer_getConfigAll.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_ConfigInfo.decode(decoder)
    } as TLFunction<liteServer_getConfigAll, liteServer_ConfigInfo>,

    liteServer_getConfigParams: {
        encodeRequest: (src: liteServer_getConfigParams, encoder: TLWriteBuffer) => { encoder.writeInt32(705764377); Codecs.liteServer_getConfigParams.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_ConfigInfo.decode(decoder)
    } as TLFunction<liteServer_getConfigParams, liteServer_ConfigInfo>,

    liteServer_getValidatorStats: {
        encodeRequest: (src: liteServer_getValidatorStats, encoder: TLWriteBuffer) => { encoder.writeInt32(-416991591); Codecs.liteServer_getValidatorStats.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_ValidatorStats.decode(decoder)
    } as TLFunction<liteServer_getValidatorStats, liteServer_ValidatorStats>,

    liteServer_getLibraries: {
        encodeRequest: (src: liteServer_getLibraries, encoder: TLWriteBuffer) => { encoder.writeInt32(-786254238); Codecs.liteServer_getLibraries.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_LibraryResult.decode(decoder)
    } as TLFunction<liteServer_getLibraries, liteServer_LibraryResult>,

    liteServer_getShardBlockProof: {
        encodeRequest: (src: liteServer_getShardBlockProof, encoder: TLWriteBuffer) => { encoder.writeInt32(1285948240); Codecs.liteServer_getShardBlockProof.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.liteServer_ShardBlockProof.decode(decoder)
    } as TLFunction<liteServer_getShardBlockProof, liteServer_ShardBlockProof>,

    liteServer_queryPrefix: {
        encodeRequest: (src: liteServer_queryPrefix, encoder: TLWriteBuffer) => { encoder.writeInt32(1926489734); Codecs.liteServer_queryPrefix.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => decoder.readObject()
    } as TLFunction<liteServer_queryPrefix, TLBytes>,

    liteServer_query: {
        encodeRequest: (src: liteServer_query, encoder: TLWriteBuffer) => { encoder.writeInt32(2039219935); Codecs.liteServer_query.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => decoder.readObject()
    } as TLFunction<liteServer_query, TLBytes>,

    liteServer_waitMasterchainSeqno: {
        encodeRequest: (src: liteServer_waitMasterchainSeqno, encoder: TLWriteBuffer) => { encoder.writeInt32(-1159022446); Codecs.liteServer_waitMasterchainSeqno.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => decoder.readObject()
    } as TLFunction<liteServer_waitMasterchainSeqno, TLBytes>,

};
//
// Codecs
//

export const Codecs = {
    tonNode_blockId: {
        encode: (src: tonNode_blockId, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.seqno);
        },
        decode: (decoder: TLReadBuffer): tonNode_blockId => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let seqno = decoder.readInt32();
            return { kind: 'tonNode.blockId', workchain, shard, seqno };
        },
    } as TLCodec<tonNode_blockId>,

    tonNode_blockIdExt: {
        encode: (src: tonNode_blockIdExt, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.seqno);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder: TLReadBuffer): tonNode_blockIdExt => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let seqno = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'tonNode.blockIdExt', workchain, shard, seqno, rootHash, fileHash };
        },
    } as TLCodec<tonNode_blockIdExt>,

    tonNode_zeroStateIdExt: {
        encode: (src: tonNode_zeroStateIdExt, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder: TLReadBuffer): tonNode_zeroStateIdExt => {
            let workchain = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'tonNode.zeroStateIdExt', workchain, rootHash, fileHash };
        },
    } as TLCodec<tonNode_zeroStateIdExt>,

    adnl_message_query: {
        encode: (src: adnl_message_query, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.queryId);
            encoder.writeBuffer(src.query);
        },
        decode: (decoder: TLReadBuffer): adnl_message_query => {
            let queryId = decoder.readInt256();
            let query = decoder.readBuffer();
            return { kind: 'adnl.message.query', queryId, query };
        },
    } as TLCodec<adnl_message_query>,

    adnl_message_answer: {
        encode: (src: adnl_message_answer, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.queryId);
            encoder.writeBuffer(src.answer);
        },
        decode: (decoder: TLReadBuffer): adnl_message_answer => {
            let queryId = decoder.readInt256();
            let answer = decoder.readBuffer();
            return { kind: 'adnl.message.answer', queryId, answer };
        },
    } as TLCodec<adnl_message_answer>,

    liteServer_error: {
        encode: (src: liteServer_error, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.code);
            encoder.writeString(src.message);
        },
        decode: (decoder: TLReadBuffer): liteServer_error => {
            let code = decoder.readInt32();
            let message = decoder.readString();
            return { kind: 'liteServer.error', code, message };
        },
    } as TLCodec<liteServer_error>,

    liteServer_accountId: {
        encode: (src: liteServer_accountId, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt256(src.id);
        },
        decode: (decoder: TLReadBuffer): liteServer_accountId => {
            let workchain = decoder.readInt32();
            let id = decoder.readInt256();
            return { kind: 'liteServer.accountId', workchain, id };
        },
    } as TLCodec<liteServer_accountId>,

    liteServer_libraryEntry: {
        encode: (src: liteServer_libraryEntry, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): liteServer_libraryEntry => {
            let hash = decoder.readInt256();
            let data = decoder.readBuffer();
            return { kind: 'liteServer.libraryEntry', hash, data };
        },
    } as TLCodec<liteServer_libraryEntry>,

    liteServer_masterchainInfo: {
        encode: (src: liteServer_masterchainInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.last, encoder);
            encoder.writeInt256(src.stateRootHash);
            Codecs.tonNode_zeroStateIdExt.encode(src.init, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_masterchainInfo => {
            let last = Codecs.tonNode_blockIdExt.decode(decoder);
            let stateRootHash = decoder.readInt256();
            let init = Codecs.tonNode_zeroStateIdExt.decode(decoder);
            return { kind: 'liteServer.masterchainInfo', last, stateRootHash, init };
        },
    } as TLCodec<liteServer_masterchainInfo>,

    liteServer_masterchainInfoExt: {
        encode: (src: liteServer_masterchainInfoExt, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            encoder.writeInt32(src.version);
            encoder.writeInt64(src.capabilities);
            Codecs.tonNode_blockIdExt.encode(src.last, encoder);
            encoder.writeInt32(src.lastUtime);
            encoder.writeInt32(src.now);
            encoder.writeInt256(src.stateRootHash);
            Codecs.tonNode_zeroStateIdExt.encode(src.init, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_masterchainInfoExt => {
            let mode = decoder.readUInt32();
            let version = decoder.readInt32();
            let capabilities = decoder.readInt64();
            let last = Codecs.tonNode_blockIdExt.decode(decoder);
            let lastUtime = decoder.readInt32();
            let now = decoder.readInt32();
            let stateRootHash = decoder.readInt256();
            let init = Codecs.tonNode_zeroStateIdExt.decode(decoder);
            return { kind: 'liteServer.masterchainInfoExt', mode, version, capabilities, last, lastUtime, now, stateRootHash, init };
        },
    } as TLCodec<liteServer_masterchainInfoExt>,

    liteServer_currentTime: {
        encode: (src: liteServer_currentTime, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.now);
        },
        decode: (decoder: TLReadBuffer): liteServer_currentTime => {
            let now = decoder.readInt32();
            return { kind: 'liteServer.currentTime', now };
        },
    } as TLCodec<liteServer_currentTime>,

    liteServer_version: {
        encode: (src: liteServer_version, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            encoder.writeInt32(src.version);
            encoder.writeInt64(src.capabilities);
            encoder.writeInt32(src.now);
        },
        decode: (decoder: TLReadBuffer): liteServer_version => {
            let mode = decoder.readUInt32();
            let version = decoder.readInt32();
            let capabilities = decoder.readInt64();
            let now = decoder.readInt32();
            return { kind: 'liteServer.version', mode, version, capabilities, now };
        },
    } as TLCodec<liteServer_version>,

    liteServer_blockData: {
        encode: (src: liteServer_blockData, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): liteServer_blockData => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let data = decoder.readBuffer();
            return { kind: 'liteServer.blockData', id, data };
        },
    } as TLCodec<liteServer_blockData>,

    liteServer_blockState: {
        encode: (src: liteServer_blockState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): liteServer_blockState => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            let data = decoder.readBuffer();
            return { kind: 'liteServer.blockState', id, rootHash, fileHash, data };
        },
    } as TLCodec<liteServer_blockState>,

    liteServer_blockHeader: {
        encode: (src: liteServer_blockHeader, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.mode);
            encoder.writeBuffer(src.headerProof);
        },
        decode: (decoder: TLReadBuffer): liteServer_blockHeader => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let mode = decoder.readUInt32();
            let headerProof = decoder.readBuffer();
            return { kind: 'liteServer.blockHeader', id, mode, headerProof };
        },
    } as TLCodec<liteServer_blockHeader>,

    liteServer_sendMsgStatus: {
        encode: (src: liteServer_sendMsgStatus, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.status);
        },
        decode: (decoder: TLReadBuffer): liteServer_sendMsgStatus => {
            let status = decoder.readInt32();
            return { kind: 'liteServer.sendMsgStatus', status };
        },
    } as TLCodec<liteServer_sendMsgStatus>,

    liteServer_accountState: {
        encode: (src: liteServer_accountState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            Codecs.tonNode_blockIdExt.encode(src.shardblk, encoder);
            encoder.writeBuffer(src.shardProof);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.state);
        },
        decode: (decoder: TLReadBuffer): liteServer_accountState => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let shardblk = Codecs.tonNode_blockIdExt.decode(decoder);
            let shardProof = decoder.readBuffer();
            let proof = decoder.readBuffer();
            let state = decoder.readBuffer();
            return { kind: 'liteServer.accountState', id, shardblk, shardProof, proof, state };
        },
    } as TLCodec<liteServer_accountState>,

    liteServer_runMethodResult: {
        encode: (src: liteServer_runMethodResult, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            Codecs.tonNode_blockIdExt.encode(src.shardblk, encoder);
            (src.mode & (1 << 0)) && !!src.shardProof && encoder.writeBuffer(src.shardProof);
            (src.mode & (1 << 0)) && !!src.proof && encoder.writeBuffer(src.proof);
            (src.mode & (1 << 1)) && !!src.stateProof && encoder.writeBuffer(src.stateProof);
            (src.mode & (1 << 3)) && !!src.initC7 && encoder.writeBuffer(src.initC7);
            (src.mode & (1 << 4)) && !!src.libExtras && encoder.writeBuffer(src.libExtras);
            encoder.writeInt32(src.exitCode);
            (src.mode & (1 << 2)) && !!src.result && encoder.writeBuffer(src.result);
        },
        decode: (decoder: TLReadBuffer): liteServer_runMethodResult => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let shardblk = Codecs.tonNode_blockIdExt.decode(decoder);
            let shardProof = (mode & (1 << 0)) ? decoder.readBuffer() : null;
            let proof = (mode & (1 << 0)) ? decoder.readBuffer() : null;
            let stateProof = (mode & (1 << 1)) ? decoder.readBuffer() : null;
            let initC7 = (mode & (1 << 3)) ? decoder.readBuffer() : null;
            let libExtras = (mode & (1 << 4)) ? decoder.readBuffer() : null;
            let exitCode = decoder.readInt32();
            let result = (mode & (1 << 2)) ? decoder.readBuffer() : null;
            return { kind: 'liteServer.runMethodResult', mode, id, shardblk, shardProof, proof, stateProof, initC7, libExtras, exitCode, result };
        },
    } as TLCodec<liteServer_runMethodResult>,

    liteServer_shardInfo: {
        encode: (src: liteServer_shardInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            Codecs.tonNode_blockIdExt.encode(src.shardblk, encoder);
            encoder.writeBuffer(src.shardProof);
            encoder.writeBuffer(src.shardDescr);
        },
        decode: (decoder: TLReadBuffer): liteServer_shardInfo => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let shardblk = Codecs.tonNode_blockIdExt.decode(decoder);
            let shardProof = decoder.readBuffer();
            let shardDescr = decoder.readBuffer();
            return { kind: 'liteServer.shardInfo', id, shardblk, shardProof, shardDescr };
        },
    } as TLCodec<liteServer_shardInfo>,

    liteServer_allShardsInfo: {
        encode: (src: liteServer_allShardsInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): liteServer_allShardsInfo => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let proof = decoder.readBuffer();
            let data = decoder.readBuffer();
            return { kind: 'liteServer.allShardsInfo', id, proof, data };
        },
    } as TLCodec<liteServer_allShardsInfo>,

    liteServer_transactionInfo: {
        encode: (src: liteServer_transactionInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.transaction);
        },
        decode: (decoder: TLReadBuffer): liteServer_transactionInfo => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let proof = decoder.readBuffer();
            let transaction = decoder.readBuffer();
            return { kind: 'liteServer.transactionInfo', id, proof, transaction };
        },
    } as TLCodec<liteServer_transactionInfo>,

    liteServer_transactionList: {
        encode: (src: liteServer_transactionList, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.ids);
            encoder.writeBuffer(src.transactions);
        },
        decode: (decoder: TLReadBuffer): liteServer_transactionList => {
            let ids = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            let transactions = decoder.readBuffer();
            return { kind: 'liteServer.transactionList', ids, transactions };
        },
    } as TLCodec<liteServer_transactionList>,

    liteServer_transactionId: {
        encode: (src: liteServer_transactionId, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            (src.mode & (1 << 0)) && !!src.account && encoder.writeInt256(src.account);
            (src.mode & (1 << 1)) && !!src.lt && encoder.writeInt64(src.lt);
            (src.mode & (1 << 2)) && !!src.hash && encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): liteServer_transactionId => {
            let mode = decoder.readUInt32();
            let account = (mode & (1 << 0)) ? decoder.readInt256() : null;
            let lt = (mode & (1 << 1)) ? decoder.readInt64() : null;
            let hash = (mode & (1 << 2)) ? decoder.readInt256() : null;
            return { kind: 'liteServer.transactionId', mode, account, lt, hash };
        },
    } as TLCodec<liteServer_transactionId>,

    liteServer_transactionId3: {
        encode: (src: liteServer_transactionId3, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.account);
            encoder.writeInt64(src.lt);
        },
        decode: (decoder: TLReadBuffer): liteServer_transactionId3 => {
            let account = decoder.readInt256();
            let lt = decoder.readInt64();
            return { kind: 'liteServer.transactionId3', account, lt };
        },
    } as TLCodec<liteServer_transactionId3>,

    liteServer_blockTransactions: {
        encode: (src: liteServer_blockTransactions, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.reqCount);
            encoder.writeBool(src.incomplete);
            encoder.writeVector(Codecs.liteServer_transactionId.encode, src.ids);
            encoder.writeBuffer(src.proof);
        },
        decode: (decoder: TLReadBuffer): liteServer_blockTransactions => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let reqCount = decoder.readUInt32();
            let incomplete = decoder.readBool();
            let ids = decoder.readVector(Codecs.liteServer_transactionId.decode);
            let proof = decoder.readBuffer();
            return { kind: 'liteServer.blockTransactions', id, reqCount, incomplete, ids, proof };
        },
    } as TLCodec<liteServer_blockTransactions>,

    liteServer_blockTransactionsExt: {
        encode: (src: liteServer_blockTransactionsExt, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.reqCount);
            encoder.writeBool(src.incomplete);
            encoder.writeBuffer(src.transactions);
            encoder.writeBuffer(src.proof);
        },
        decode: (decoder: TLReadBuffer): liteServer_blockTransactionsExt => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let reqCount = decoder.readUInt32();
            let incomplete = decoder.readBool();
            let transactions = decoder.readBuffer();
            let proof = decoder.readBuffer();
            return { kind: 'liteServer.blockTransactionsExt', id, reqCount, incomplete, transactions, proof };
        },
    } as TLCodec<liteServer_blockTransactionsExt>,

    liteServer_signature: {
        encode: (src: liteServer_signature, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.nodeIdShort);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): liteServer_signature => {
            let nodeIdShort = decoder.readInt256();
            let signature = decoder.readBuffer();
            return { kind: 'liteServer.signature', nodeIdShort, signature };
        },
    } as TLCodec<liteServer_signature>,

    liteServer_signatureSet: {
        encode: (src: liteServer_signatureSet, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.validatorSetHash);
            encoder.writeInt32(src.catchainSeqno);
            encoder.writeVector(Codecs.liteServer_signature.encode, src.signatures);
        },
        decode: (decoder: TLReadBuffer): liteServer_signatureSet => {
            let validatorSetHash = decoder.readInt32();
            let catchainSeqno = decoder.readInt32();
            let signatures = decoder.readVector(Codecs.liteServer_signature.decode);
            return { kind: 'liteServer.signatureSet', validatorSetHash, catchainSeqno, signatures };
        },
    } as TLCodec<liteServer_signatureSet>,

    liteServer_blockLinkBack: {
        encode: (src: liteServer_blockLinkBack, encoder: TLWriteBuffer) => {
            encoder.writeBool(src.toKeyBlock);
            Codecs.tonNode_blockIdExt.encode(src.from, encoder);
            Codecs.tonNode_blockIdExt.encode(src.to, encoder);
            encoder.writeBuffer(src.destProof);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.stateProof);
        },
        decode: (decoder: TLReadBuffer): liteServer_blockLinkBack => {
            let toKeyBlock = decoder.readBool();
            let from = Codecs.tonNode_blockIdExt.decode(decoder);
            let to = Codecs.tonNode_blockIdExt.decode(decoder);
            let destProof = decoder.readBuffer();
            let proof = decoder.readBuffer();
            let stateProof = decoder.readBuffer();
            return { kind: 'liteServer.blockLinkBack', toKeyBlock, from, to, destProof, proof, stateProof };
        },
    } as TLCodec<liteServer_blockLinkBack>,

    liteServer_blockLinkForward: {
        encode: (src: liteServer_blockLinkForward, encoder: TLWriteBuffer) => {
            encoder.writeBool(src.toKeyBlock);
            Codecs.tonNode_blockIdExt.encode(src.from, encoder);
            Codecs.tonNode_blockIdExt.encode(src.to, encoder);
            encoder.writeBuffer(src.destProof);
            encoder.writeBuffer(src.configProof);
            Codecs.liteServer_SignatureSet.encode(src.signatures, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_blockLinkForward => {
            let toKeyBlock = decoder.readBool();
            let from = Codecs.tonNode_blockIdExt.decode(decoder);
            let to = Codecs.tonNode_blockIdExt.decode(decoder);
            let destProof = decoder.readBuffer();
            let configProof = decoder.readBuffer();
            let signatures = Codecs.liteServer_SignatureSet.decode(decoder);
            return { kind: 'liteServer.blockLinkForward', toKeyBlock, from, to, destProof, configProof, signatures };
        },
    } as TLCodec<liteServer_blockLinkForward>,

    liteServer_partialBlockProof: {
        encode: (src: liteServer_partialBlockProof, encoder: TLWriteBuffer) => {
            encoder.writeBool(src.complete);
            Codecs.tonNode_blockIdExt.encode(src.from, encoder);
            Codecs.tonNode_blockIdExt.encode(src.to, encoder);
            encoder.writeVector(Codecs.liteServer_BlockLink.encode, src.steps);
        },
        decode: (decoder: TLReadBuffer): liteServer_partialBlockProof => {
            let complete = decoder.readBool();
            let from = Codecs.tonNode_blockIdExt.decode(decoder);
            let to = Codecs.tonNode_blockIdExt.decode(decoder);
            let steps = decoder.readVector(Codecs.liteServer_BlockLink.decode);
            return { kind: 'liteServer.partialBlockProof', complete, from, to, steps };
        },
    } as TLCodec<liteServer_partialBlockProof>,

    liteServer_configInfo: {
        encode: (src: liteServer_configInfo, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.stateProof);
            encoder.writeBuffer(src.configProof);
        },
        decode: (decoder: TLReadBuffer): liteServer_configInfo => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let stateProof = decoder.readBuffer();
            let configProof = decoder.readBuffer();
            return { kind: 'liteServer.configInfo', mode, id, stateProof, configProof };
        },
    } as TLCodec<liteServer_configInfo>,

    liteServer_validatorStats: {
        encode: (src: liteServer_validatorStats, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.count);
            encoder.writeBool(src.complete);
            encoder.writeBuffer(src.stateProof);
            encoder.writeBuffer(src.dataProof);
        },
        decode: (decoder: TLReadBuffer): liteServer_validatorStats => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let count = decoder.readInt32();
            let complete = decoder.readBool();
            let stateProof = decoder.readBuffer();
            let dataProof = decoder.readBuffer();
            return { kind: 'liteServer.validatorStats', mode, id, count, complete, stateProof, dataProof };
        },
    } as TLCodec<liteServer_validatorStats>,

    liteServer_libraryResult: {
        encode: (src: liteServer_libraryResult, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.liteServer_libraryEntry.encode, src.result);
        },
        decode: (decoder: TLReadBuffer): liteServer_libraryResult => {
            let result = decoder.readVector(Codecs.liteServer_libraryEntry.decode);
            return { kind: 'liteServer.libraryResult', result };
        },
    } as TLCodec<liteServer_libraryResult>,

    liteServer_shardBlockLink: {
        encode: (src: liteServer_shardBlockLink, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.proof);
        },
        decode: (decoder: TLReadBuffer): liteServer_shardBlockLink => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let proof = decoder.readBuffer();
            return { kind: 'liteServer.shardBlockLink', id, proof };
        },
    } as TLCodec<liteServer_shardBlockLink>,

    liteServer_shardBlockProof: {
        encode: (src: liteServer_shardBlockProof, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.masterchainId, encoder);
            encoder.writeVector(Codecs.liteServer_shardBlockLink.encode, src.links);
        },
        decode: (decoder: TLReadBuffer): liteServer_shardBlockProof => {
            let masterchainId = Codecs.tonNode_blockIdExt.decode(decoder);
            let links = decoder.readVector(Codecs.liteServer_shardBlockLink.decode);
            return { kind: 'liteServer.shardBlockProof', masterchainId, links };
        },
    } as TLCodec<liteServer_shardBlockProof>,

    liteServer_debug_verbosity: {
        encode: (src: liteServer_debug_verbosity, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.value);
        },
        decode: (decoder: TLReadBuffer): liteServer_debug_verbosity => {
            let value = decoder.readInt32();
            return { kind: 'liteServer.debug.verbosity', value };
        },
    } as TLCodec<liteServer_debug_verbosity>,

    liteServer_getMasterchainInfo: {
        encode: (src: liteServer_getMasterchainInfo, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): liteServer_getMasterchainInfo => {
            return { kind: 'liteServer.getMasterchainInfo',  };
        },
    } as TLCodec<liteServer_getMasterchainInfo>,

    liteServer_getMasterchainInfoExt: {
        encode: (src: liteServer_getMasterchainInfoExt, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
        },
        decode: (decoder: TLReadBuffer): liteServer_getMasterchainInfoExt => {
            let mode = decoder.readUInt32();
            return { kind: 'liteServer.getMasterchainInfoExt', mode };
        },
    } as TLCodec<liteServer_getMasterchainInfoExt>,

    liteServer_getTime: {
        encode: (src: liteServer_getTime, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): liteServer_getTime => {
            return { kind: 'liteServer.getTime',  };
        },
    } as TLCodec<liteServer_getTime>,

    liteServer_getVersion: {
        encode: (src: liteServer_getVersion, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): liteServer_getVersion => {
            return { kind: 'liteServer.getVersion',  };
        },
    } as TLCodec<liteServer_getVersion>,

    liteServer_getBlock: {
        encode: (src: liteServer_getBlock, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getBlock => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getBlock', id };
        },
    } as TLCodec<liteServer_getBlock>,

    liteServer_getState: {
        encode: (src: liteServer_getState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getState => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getState', id };
        },
    } as TLCodec<liteServer_getState>,

    liteServer_getBlockHeader: {
        encode: (src: liteServer_getBlockHeader, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.mode);
        },
        decode: (decoder: TLReadBuffer): liteServer_getBlockHeader => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let mode = decoder.readUInt32();
            return { kind: 'liteServer.getBlockHeader', id, mode };
        },
    } as TLCodec<liteServer_getBlockHeader>,

    liteServer_sendMessage: {
        encode: (src: liteServer_sendMessage, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.body);
        },
        decode: (decoder: TLReadBuffer): liteServer_sendMessage => {
            let body = decoder.readBuffer();
            return { kind: 'liteServer.sendMessage', body };
        },
    } as TLCodec<liteServer_sendMessage>,

    liteServer_getAccountState: {
        encode: (src: liteServer_getAccountState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            Codecs.liteServer_accountId.encode(src.account, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getAccountState => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let account = Codecs.liteServer_accountId.decode(decoder);
            return { kind: 'liteServer.getAccountState', id, account };
        },
    } as TLCodec<liteServer_getAccountState>,

    liteServer_getAccountStatePrunned: {
        encode: (src: liteServer_getAccountStatePrunned, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            Codecs.liteServer_accountId.encode(src.account, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getAccountStatePrunned => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let account = Codecs.liteServer_accountId.decode(decoder);
            return { kind: 'liteServer.getAccountStatePrunned', id, account };
        },
    } as TLCodec<liteServer_getAccountStatePrunned>,

    liteServer_runSmcMethod: {
        encode: (src: liteServer_runSmcMethod, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            Codecs.liteServer_accountId.encode(src.account, encoder);
            encoder.writeInt64(src.methodId);
            encoder.writeBuffer(src.params);
        },
        decode: (decoder: TLReadBuffer): liteServer_runSmcMethod => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let account = Codecs.liteServer_accountId.decode(decoder);
            let methodId = decoder.readInt64();
            let params = decoder.readBuffer();
            return { kind: 'liteServer.runSmcMethod', mode, id, account, methodId, params };
        },
    } as TLCodec<liteServer_runSmcMethod>,

    liteServer_getShardInfo: {
        encode: (src: liteServer_getShardInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeBool(src.exact);
        },
        decode: (decoder: TLReadBuffer): liteServer_getShardInfo => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let exact = decoder.readBool();
            return { kind: 'liteServer.getShardInfo', id, workchain, shard, exact };
        },
    } as TLCodec<liteServer_getShardInfo>,

    liteServer_getAllShardsInfo: {
        encode: (src: liteServer_getAllShardsInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getAllShardsInfo => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getAllShardsInfo', id };
        },
    } as TLCodec<liteServer_getAllShardsInfo>,

    liteServer_getOneTransaction: {
        encode: (src: liteServer_getOneTransaction, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            Codecs.liteServer_accountId.encode(src.account, encoder);
            encoder.writeInt64(src.lt);
        },
        decode: (decoder: TLReadBuffer): liteServer_getOneTransaction => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let account = Codecs.liteServer_accountId.decode(decoder);
            let lt = decoder.readInt64();
            return { kind: 'liteServer.getOneTransaction', id, account, lt };
        },
    } as TLCodec<liteServer_getOneTransaction>,

    liteServer_getTransactions: {
        encode: (src: liteServer_getTransactions, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.count);
            Codecs.liteServer_accountId.encode(src.account, encoder);
            encoder.writeInt64(src.lt);
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): liteServer_getTransactions => {
            let count = decoder.readUInt32();
            let account = Codecs.liteServer_accountId.decode(decoder);
            let lt = decoder.readInt64();
            let hash = decoder.readInt256();
            return { kind: 'liteServer.getTransactions', count, account, lt, hash };
        },
    } as TLCodec<liteServer_getTransactions>,

    liteServer_lookupBlock: {
        encode: (src: liteServer_lookupBlock, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockId.encode(src.id, encoder);
            (src.mode & (1 << 1)) && !!src.lt && encoder.writeInt64(src.lt);
            (src.mode & (1 << 2)) && !!src.utime && encoder.writeInt32(src.utime);
        },
        decode: (decoder: TLReadBuffer): liteServer_lookupBlock => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockId.decode(decoder);
            let lt = (mode & (1 << 1)) ? decoder.readInt64() : null;
            let utime = (mode & (1 << 2)) ? decoder.readInt32() : null;
            return { kind: 'liteServer.lookupBlock', mode, id, lt, utime };
        },
    } as TLCodec<liteServer_lookupBlock>,

    liteServer_listBlockTransactions: {
        encode: (src: liteServer_listBlockTransactions, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.mode);
            encoder.writeUInt32(src.count);
            (src.mode & (1 << 7)) && !!src.after && Codecs.liteServer_transactionId3.encode(src.after, encoder);
            (src.mode & (1 << 6)) && !!src.reverseOrder && encoder.writeBool(src.reverseOrder);
            (src.mode & (1 << 5)) && !!src.wantProof && encoder.writeBool(src.wantProof);
        },
        decode: (decoder: TLReadBuffer): liteServer_listBlockTransactions => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let mode = decoder.readUInt32();
            let count = decoder.readUInt32();
            let after = (mode & (1 << 7)) ? Codecs.liteServer_transactionId3.decode(decoder) : null;
            let reverseOrder = (mode & (1 << 6)) ? decoder.readBool() : null;
            let wantProof = (mode & (1 << 5)) ? decoder.readBool() : null;
            return { kind: 'liteServer.listBlockTransactions', id, mode, count, after, reverseOrder, wantProof };
        },
    } as TLCodec<liteServer_listBlockTransactions>,

    liteServer_listBlockTransactionsExt: {
        encode: (src: liteServer_listBlockTransactionsExt, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.mode);
            encoder.writeUInt32(src.count);
            (src.mode & (1 << 7)) && !!src.after && Codecs.liteServer_transactionId3.encode(src.after, encoder);
            (src.mode & (1 << 6)) && !!src.reverseOrder && encoder.writeBool(src.reverseOrder);
            (src.mode & (1 << 5)) && !!src.wantProof && encoder.writeBool(src.wantProof);
        },
        decode: (decoder: TLReadBuffer): liteServer_listBlockTransactionsExt => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let mode = decoder.readUInt32();
            let count = decoder.readUInt32();
            let after = (mode & (1 << 7)) ? Codecs.liteServer_transactionId3.decode(decoder) : null;
            let reverseOrder = (mode & (1 << 6)) ? decoder.readBool() : null;
            let wantProof = (mode & (1 << 5)) ? decoder.readBool() : null;
            return { kind: 'liteServer.listBlockTransactionsExt', id, mode, count, after, reverseOrder, wantProof };
        },
    } as TLCodec<liteServer_listBlockTransactionsExt>,

    liteServer_getBlockProof: {
        encode: (src: liteServer_getBlockProof, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.knownBlock, encoder);
            (src.mode & (1 << 0)) && !!src.targetBlock && Codecs.tonNode_blockIdExt.encode(src.targetBlock, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getBlockProof => {
            let mode = decoder.readUInt32();
            let knownBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            let targetBlock = (mode & (1 << 0)) ? Codecs.tonNode_blockIdExt.decode(decoder) : null;
            return { kind: 'liteServer.getBlockProof', mode, knownBlock, targetBlock };
        },
    } as TLCodec<liteServer_getBlockProof>,

    liteServer_getConfigAll: {
        encode: (src: liteServer_getConfigAll, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getConfigAll => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getConfigAll', mode, id };
        },
    } as TLCodec<liteServer_getConfigAll>,

    liteServer_getConfigParams: {
        encode: (src: liteServer_getConfigParams, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeVector((s, d) => d.writeInt32(s), src.paramList);
        },
        decode: (decoder: TLReadBuffer): liteServer_getConfigParams => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let paramList = decoder.readVector((d) => d.readInt32());
            return { kind: 'liteServer.getConfigParams', mode, id, paramList };
        },
    } as TLCodec<liteServer_getConfigParams>,

    liteServer_getValidatorStats: {
        encode: (src: liteServer_getValidatorStats, encoder: TLWriteBuffer) => {
            encoder.writeUInt32(src.mode);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.limit);
            (src.mode & (1 << 0)) && !!src.startAfter && encoder.writeInt256(src.startAfter);
            (src.mode & (1 << 2)) && !!src.modifiedAfter && encoder.writeInt32(src.modifiedAfter);
        },
        decode: (decoder: TLReadBuffer): liteServer_getValidatorStats => {
            let mode = decoder.readUInt32();
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let limit = decoder.readInt32();
            let startAfter = (mode & (1 << 0)) ? decoder.readInt256() : null;
            let modifiedAfter = (mode & (1 << 2)) ? decoder.readInt32() : null;
            return { kind: 'liteServer.getValidatorStats', mode, id, limit, startAfter, modifiedAfter };
        },
    } as TLCodec<liteServer_getValidatorStats>,

    liteServer_getLibraries: {
        encode: (src: liteServer_getLibraries, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt256(s), src.libraryList);
        },
        decode: (decoder: TLReadBuffer): liteServer_getLibraries => {
            let libraryList = decoder.readVector((d) => d.readInt256());
            return { kind: 'liteServer.getLibraries', libraryList };
        },
    } as TLCodec<liteServer_getLibraries>,

    liteServer_getShardBlockProof: {
        encode: (src: liteServer_getShardBlockProof, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): liteServer_getShardBlockProof => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'liteServer.getShardBlockProof', id };
        },
    } as TLCodec<liteServer_getShardBlockProof>,

    liteServer_queryPrefix: {
        encode: (src: liteServer_queryPrefix, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): liteServer_queryPrefix => {
            return { kind: 'liteServer.queryPrefix',  };
        },
    } as TLCodec<liteServer_queryPrefix>,

    liteServer_query: {
        encode: (src: liteServer_query, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): liteServer_query => {
            let data = decoder.readBuffer();
            return { kind: 'liteServer.query', data };
        },
    } as TLCodec<liteServer_query>,

    liteServer_waitMasterchainSeqno: {
        encode: (src: liteServer_waitMasterchainSeqno, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.seqno);
            encoder.writeInt32(src.timeoutMs);
        },
        decode: (decoder: TLReadBuffer): liteServer_waitMasterchainSeqno => {
            let seqno = decoder.readInt32();
            let timeoutMs = decoder.readInt32();
            return { kind: 'liteServer.waitMasterchainSeqno', seqno, timeoutMs };
        },
    } as TLCodec<liteServer_waitMasterchainSeqno>,

    tonNode_BlockId: {
        encode: (src: tonNode_BlockId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockId') {
                encoder.writeInt32(-1211256473);
                Codecs.tonNode_blockId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_BlockId => {
            const kind = decoder.readInt32();
            if (kind === -1211256473) {
                return Codecs.tonNode_blockId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_BlockId>,

    tonNode_BlockIdExt: {
        encode: (src: tonNode_BlockIdExt, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockIdExt') {
                encoder.writeInt32(1733487480);
                Codecs.tonNode_blockIdExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_BlockIdExt => {
            const kind = decoder.readInt32();
            if (kind === 1733487480) {
                return Codecs.tonNode_blockIdExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_BlockIdExt>,

    tonNode_ZeroStateIdExt: {
        encode: (src: tonNode_ZeroStateIdExt, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.zeroStateIdExt') {
                encoder.writeInt32(494024110);
                Codecs.tonNode_zeroStateIdExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_ZeroStateIdExt => {
            const kind = decoder.readInt32();
            if (kind === 494024110) {
                return Codecs.tonNode_zeroStateIdExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_ZeroStateIdExt>,

    adnl_Message: {
        encode: (src: adnl_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.message.query') {
                encoder.writeInt32(-1265895046);
                Codecs.adnl_message_query.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.answer') {
                encoder.writeInt32(262964246);
                Codecs.adnl_message_answer.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_Message => {
            const kind = decoder.readInt32();
            if (kind === -1265895046) {
                return Codecs.adnl_message_query.decode(decoder);
            }
            if (kind === 262964246) {
                return Codecs.adnl_message_answer.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_Message>,

    liteServer_Error: {
        encode: (src: liteServer_Error, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.error') {
                encoder.writeInt32(-1146494648);
                Codecs.liteServer_error.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_Error => {
            const kind = decoder.readInt32();
            if (kind === -1146494648) {
                return Codecs.liteServer_error.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_Error>,

    liteServer_AccountId: {
        encode: (src: liteServer_AccountId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.accountId') {
                encoder.writeInt32(1973478085);
                Codecs.liteServer_accountId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_AccountId => {
            const kind = decoder.readInt32();
            if (kind === 1973478085) {
                return Codecs.liteServer_accountId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_AccountId>,

    liteServer_LibraryEntry: {
        encode: (src: liteServer_LibraryEntry, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.libraryEntry') {
                encoder.writeInt32(-1962990522);
                Codecs.liteServer_libraryEntry.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_LibraryEntry => {
            const kind = decoder.readInt32();
            if (kind === -1962990522) {
                return Codecs.liteServer_libraryEntry.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_LibraryEntry>,

    liteServer_MasterchainInfo: {
        encode: (src: liteServer_MasterchainInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.masterchainInfo') {
                encoder.writeInt32(-2055001983);
                Codecs.liteServer_masterchainInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_MasterchainInfo => {
            const kind = decoder.readInt32();
            if (kind === -2055001983) {
                return Codecs.liteServer_masterchainInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_MasterchainInfo>,

    liteServer_MasterchainInfoExt: {
        encode: (src: liteServer_MasterchainInfoExt, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.masterchainInfoExt') {
                encoder.writeInt32(-1462968075);
                Codecs.liteServer_masterchainInfoExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_MasterchainInfoExt => {
            const kind = decoder.readInt32();
            if (kind === -1462968075) {
                return Codecs.liteServer_masterchainInfoExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_MasterchainInfoExt>,

    liteServer_CurrentTime: {
        encode: (src: liteServer_CurrentTime, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.currentTime') {
                encoder.writeInt32(-380436467);
                Codecs.liteServer_currentTime.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_CurrentTime => {
            const kind = decoder.readInt32();
            if (kind === -380436467) {
                return Codecs.liteServer_currentTime.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_CurrentTime>,

    liteServer_Version: {
        encode: (src: liteServer_Version, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.version') {
                encoder.writeInt32(1510248933);
                Codecs.liteServer_version.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_Version => {
            const kind = decoder.readInt32();
            if (kind === 1510248933) {
                return Codecs.liteServer_version.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_Version>,

    liteServer_BlockData: {
        encode: (src: liteServer_BlockData, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockData') {
                encoder.writeInt32(-1519063700);
                Codecs.liteServer_blockData.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_BlockData => {
            const kind = decoder.readInt32();
            if (kind === -1519063700) {
                return Codecs.liteServer_blockData.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_BlockData>,

    liteServer_BlockState: {
        encode: (src: liteServer_BlockState, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockState') {
                encoder.writeInt32(-1414669300);
                Codecs.liteServer_blockState.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_BlockState => {
            const kind = decoder.readInt32();
            if (kind === -1414669300) {
                return Codecs.liteServer_blockState.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_BlockState>,

    liteServer_BlockHeader: {
        encode: (src: liteServer_BlockHeader, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockHeader') {
                encoder.writeInt32(1965916697);
                Codecs.liteServer_blockHeader.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_BlockHeader => {
            const kind = decoder.readInt32();
            if (kind === 1965916697) {
                return Codecs.liteServer_blockHeader.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_BlockHeader>,

    liteServer_SendMsgStatus: {
        encode: (src: liteServer_SendMsgStatus, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.sendMsgStatus') {
                encoder.writeInt32(961602967);
                Codecs.liteServer_sendMsgStatus.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_SendMsgStatus => {
            const kind = decoder.readInt32();
            if (kind === 961602967) {
                return Codecs.liteServer_sendMsgStatus.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_SendMsgStatus>,

    liteServer_AccountState: {
        encode: (src: liteServer_AccountState, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.accountState') {
                encoder.writeInt32(1887029073);
                Codecs.liteServer_accountState.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_AccountState => {
            const kind = decoder.readInt32();
            if (kind === 1887029073) {
                return Codecs.liteServer_accountState.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_AccountState>,

    liteServer_RunMethodResult: {
        encode: (src: liteServer_RunMethodResult, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.runMethodResult') {
                encoder.writeInt32(-1550163605);
                Codecs.liteServer_runMethodResult.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_RunMethodResult => {
            const kind = decoder.readInt32();
            if (kind === -1550163605) {
                return Codecs.liteServer_runMethodResult.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_RunMethodResult>,

    liteServer_ShardInfo: {
        encode: (src: liteServer_ShardInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.shardInfo') {
                encoder.writeInt32(-1612264060);
                Codecs.liteServer_shardInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_ShardInfo => {
            const kind = decoder.readInt32();
            if (kind === -1612264060) {
                return Codecs.liteServer_shardInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_ShardInfo>,

    liteServer_AllShardsInfo: {
        encode: (src: liteServer_AllShardsInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.allShardsInfo') {
                encoder.writeInt32(160425773);
                Codecs.liteServer_allShardsInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_AllShardsInfo => {
            const kind = decoder.readInt32();
            if (kind === 160425773) {
                return Codecs.liteServer_allShardsInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_AllShardsInfo>,

    liteServer_TransactionInfo: {
        encode: (src: liteServer_TransactionInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionInfo') {
                encoder.writeInt32(249490759);
                Codecs.liteServer_transactionInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_TransactionInfo => {
            const kind = decoder.readInt32();
            if (kind === 249490759) {
                return Codecs.liteServer_transactionInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_TransactionInfo>,

    liteServer_TransactionList: {
        encode: (src: liteServer_TransactionList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionList') {
                encoder.writeInt32(1864812043);
                Codecs.liteServer_transactionList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_TransactionList => {
            const kind = decoder.readInt32();
            if (kind === 1864812043) {
                return Codecs.liteServer_transactionList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_TransactionList>,

    liteServer_TransactionId: {
        encode: (src: liteServer_TransactionId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionId') {
                encoder.writeInt32(-1322293841);
                Codecs.liteServer_transactionId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_TransactionId => {
            const kind = decoder.readInt32();
            if (kind === -1322293841) {
                return Codecs.liteServer_transactionId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_TransactionId>,

    liteServer_TransactionId3: {
        encode: (src: liteServer_TransactionId3, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.transactionId3') {
                encoder.writeInt32(746707575);
                Codecs.liteServer_transactionId3.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_TransactionId3 => {
            const kind = decoder.readInt32();
            if (kind === 746707575) {
                return Codecs.liteServer_transactionId3.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_TransactionId3>,

    liteServer_BlockTransactions: {
        encode: (src: liteServer_BlockTransactions, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockTransactions') {
                encoder.writeInt32(-1114854101);
                Codecs.liteServer_blockTransactions.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_BlockTransactions => {
            const kind = decoder.readInt32();
            if (kind === -1114854101) {
                return Codecs.liteServer_blockTransactions.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_BlockTransactions>,

    liteServer_BlockTransactionsExt: {
        encode: (src: liteServer_BlockTransactionsExt, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockTransactionsExt') {
                encoder.writeInt32(-74449692);
                Codecs.liteServer_blockTransactionsExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_BlockTransactionsExt => {
            const kind = decoder.readInt32();
            if (kind === -74449692) {
                return Codecs.liteServer_blockTransactionsExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_BlockTransactionsExt>,

    liteServer_Signature: {
        encode: (src: liteServer_Signature, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.signature') {
                encoder.writeInt32(-1545668523);
                Codecs.liteServer_signature.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_Signature => {
            const kind = decoder.readInt32();
            if (kind === -1545668523) {
                return Codecs.liteServer_signature.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_Signature>,

    liteServer_SignatureSet: {
        encode: (src: liteServer_SignatureSet, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.signatureSet') {
                encoder.writeInt32(-163272986);
                Codecs.liteServer_signatureSet.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_SignatureSet => {
            const kind = decoder.readInt32();
            if (kind === -163272986) {
                return Codecs.liteServer_signatureSet.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_SignatureSet>,

    liteServer_BlockLink: {
        encode: (src: liteServer_BlockLink, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.blockLinkBack') {
                encoder.writeInt32(-276947985);
                Codecs.liteServer_blockLinkBack.encode(src, encoder);
                return;
            }
            if (kind === 'liteServer.blockLinkForward') {
                encoder.writeInt32(1376767516);
                Codecs.liteServer_blockLinkForward.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_BlockLink => {
            const kind = decoder.readInt32();
            if (kind === -276947985) {
                return Codecs.liteServer_blockLinkBack.decode(decoder);
            }
            if (kind === 1376767516) {
                return Codecs.liteServer_blockLinkForward.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_BlockLink>,

    liteServer_PartialBlockProof: {
        encode: (src: liteServer_PartialBlockProof, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.partialBlockProof') {
                encoder.writeInt32(-1898917183);
                Codecs.liteServer_partialBlockProof.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_PartialBlockProof => {
            const kind = decoder.readInt32();
            if (kind === -1898917183) {
                return Codecs.liteServer_partialBlockProof.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_PartialBlockProof>,

    liteServer_ConfigInfo: {
        encode: (src: liteServer_ConfigInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.configInfo') {
                encoder.writeInt32(-1367660753);
                Codecs.liteServer_configInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_ConfigInfo => {
            const kind = decoder.readInt32();
            if (kind === -1367660753) {
                return Codecs.liteServer_configInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_ConfigInfo>,

    liteServer_ValidatorStats: {
        encode: (src: liteServer_ValidatorStats, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.validatorStats') {
                encoder.writeInt32(-1174956328);
                Codecs.liteServer_validatorStats.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_ValidatorStats => {
            const kind = decoder.readInt32();
            if (kind === -1174956328) {
                return Codecs.liteServer_validatorStats.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_ValidatorStats>,

    liteServer_LibraryResult: {
        encode: (src: liteServer_LibraryResult, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.libraryResult') {
                encoder.writeInt32(293255531);
                Codecs.liteServer_libraryResult.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_LibraryResult => {
            const kind = decoder.readInt32();
            if (kind === 293255531) {
                return Codecs.liteServer_libraryResult.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_LibraryResult>,

    liteServer_ShardBlockLink: {
        encode: (src: liteServer_ShardBlockLink, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.shardBlockLink') {
                encoder.writeInt32(-754069646);
                Codecs.liteServer_shardBlockLink.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_ShardBlockLink => {
            const kind = decoder.readInt32();
            if (kind === -754069646) {
                return Codecs.liteServer_shardBlockLink.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_ShardBlockLink>,

    liteServer_ShardBlockProof: {
        encode: (src: liteServer_ShardBlockProof, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.shardBlockProof') {
                encoder.writeInt32(493002874);
                Codecs.liteServer_shardBlockProof.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_ShardBlockProof => {
            const kind = decoder.readInt32();
            if (kind === 493002874) {
                return Codecs.liteServer_shardBlockProof.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_ShardBlockProof>,

    liteServer_debug_Verbosity: {
        encode: (src: liteServer_debug_Verbosity, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteServer.debug.verbosity') {
                encoder.writeInt32(1564493619);
                Codecs.liteServer_debug_verbosity.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteServer_debug_Verbosity => {
            const kind = decoder.readInt32();
            if (kind === 1564493619) {
                return Codecs.liteServer_debug_verbosity.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteServer_debug_Verbosity>,

};
