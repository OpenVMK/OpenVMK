// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMessage / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_mp_MessageIDList", new LingoPropList([]));
  setMeProp(_me, "m_rModReplyField", undefined);
  return 1;
}

