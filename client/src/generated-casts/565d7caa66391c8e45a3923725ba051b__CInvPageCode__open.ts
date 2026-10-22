// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCode / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe) {
  var t_ar_rFields = new LingoList([]);
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input1"))
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input2"))
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input3"))
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"))
  for (var t_field of t_ar_rFields.toArray()) {
  if (lingoBinary("neq", t_field, 0)) {
  callMethod("setText", t_field, "")
  }

  }

  callNamed("createTimeout", symbol("setFocusTimeOut"), 500, symbol("setFocus"), callMethod("getID", _me), undefined, 1)
}

