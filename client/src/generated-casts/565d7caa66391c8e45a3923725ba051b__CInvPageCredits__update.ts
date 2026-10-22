// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCredits / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", a_kAlteredCategory, symbol("credits"))) {
  var t_iCredits = callMethod("getaProp", a_mp_kType_mp_iRef_rItem, symbol("credits"))[1];
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.credits.amount"), callNamed("string", t_iCredits))
  }

  }

}

