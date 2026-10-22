// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / setField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setField(_me: LingoMe, t_rWindow: LingoValue, t_sFieldName: LingoValue, t_sText: LingoValue) {
  if (callNamed("objectp", t_rWindow)) {
  var t_rTitleElem = callMethod("getElement", t_rWindow, t_sFieldName);
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, t_sText)
  }

  }

}

