// core.old.cct / Text API / textExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function textExists(_me: LingoMe, tID: LingoValue) {
  /*
   * ⚠ HAND-CORRECTED: a string key must match the stored key's case exactly.
   *
   * `CMgrText.dump` stores every text under its lowercased key. `CMgrText.get`
   * retries with the key lowered, but `exists` (inherited from CMgrVariable)
   * does not, so in Shockwave `textExists("roomLand.5008")` is false and the
   * shop's Rooms tab never draws a land badge. `LingoPropList` folds the case of
   * string keys, which made it true here: badges appeared, and with no
   * `roomLand.<code>` text a room kept the badge of the room paged from.
   *
   * Only this check is exact. Other code relies on the fold (the broker's symbol
   * vs string keys), so it stays in `LingoPropList.keyEquals`.
   */
  const tManager = callNamed("getTextManager");
  if (typeof tID === "string" && !tID.startsWith("#")) {
    const tList = tManager.pItemList;
    const tPos = callMethod("findPos", tList, tID);
    if (!lingoTruthy(tPos) || callMethod("getPropAt", tList, tPos) !== tID) return 0;
  }
  return callMethod("exists", tManager, tID);
}

