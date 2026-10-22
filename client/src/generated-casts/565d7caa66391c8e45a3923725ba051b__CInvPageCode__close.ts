// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCode / close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function close(_me: LingoMe, _this: LingoValue) {
  var t_ar_rFields = new LingoList([]);
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input1"))
  if (lingoBinary("neq", t_ar_rFields[1], 0)) {
  callMethod("setEdit", t_ar_rFields[1], 0)
  }

}

