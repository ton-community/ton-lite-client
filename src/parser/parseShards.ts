/**
 * Copyright 
 *  (c) 2022 Whales Corp.
 *  (c) 2023 TrueCarry <truecarry@gmail.com>
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Slice } from "@ton/core";
import { parseDict } from "@ton/core/dist/dict/parseDict"
import { TLReadBuffer } from "ton-tl";

// Source: https://github.com/ton-foundation/ton/blob/ae5c0720143e231c32c3d2034cfe4e533a16d969/crypto/block/mc-config.cpp#L1232
export function parseShards(cs: Slice) {
    if (!cs.loadBit()) {
        throw Error('Invalid slice');
    }
    return parseDict(cs.loadRef().asSlice(), 32, (cs2) => {
        let stack: { slice: Slice, shard: bigint }[] = [{ slice: cs2.loadRef().asSlice(), shard: 1n << 63n }];
        let res: Map<string, number> = new Map();
        while (stack.length > 0) {
            let item = stack.pop()!;
            let slice = item.slice;
            let shard = item.shard;
            let t = slice.loadBit();
            if (!t) {
                slice.skip(4);
                let seqno = slice.loadUint(32);
                const id = BigInt.asIntN(64, shard).toString(10);
                res.set(id, seqno);
                continue;
            }
            // Also check math
            // let delta = shard.and(shard.notn(64).addn(1)).shrn(1);
            let delta = (shard & (~shard + 1n)) >> 1n;
            if (!delta || (slice.remainingRefs !== 2 || slice.remainingBits > 0)) {
                continue;
            }
            stack.push({ slice: slice.loadRef().asSlice(), shard: shard - delta });
            stack.push({ slice: slice.loadRef().asSlice(), shard: shard + delta });
        }
        return res;
    });
}
