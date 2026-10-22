// item_2355.cct / CCheckersGameInterface / showmessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showmessage(_me: LingoMe, _this: LingoValue, a_sText: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "info.text"), a_sText)
  }

}

