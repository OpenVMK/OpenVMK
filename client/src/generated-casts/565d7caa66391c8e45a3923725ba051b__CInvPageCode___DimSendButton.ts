// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCode / _DimSendButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _DimSendButton(_me: LingoMe, _this: LingoValue) {
  var t_bValid = 1;
  for (var i = 1; i <= 4; ++i) {
  t_bValid = lingoBinary("and", t_bValid, lingoBinary("eq", callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", "inv.codes.input", i))).length, 4));
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.entercode.button"), symbol("blend"), lingoBinary("add", 50, lingoBinary("mul", t_bValid, 50)))
}

