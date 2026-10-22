// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / RegisterCreditUpdateCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RegisterCreditUpdateCallback(_me: LingoMe, _this: LingoValue, a_kMethod: LingoValue, a_rObject: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_mpCreditsCallbacks"), new LingoPropList([symbol("method"), a_kMethod, symbol("object"), a_rObject]))
}

