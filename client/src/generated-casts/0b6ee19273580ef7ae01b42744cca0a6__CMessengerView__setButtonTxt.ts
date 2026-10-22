// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerView / setButtonTxt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonTxt(_me: LingoMe, a_sButton: LingoValue, a_sText: LingoValue) {
  var t_rButton = callMethod("getElement", _me.m_rWindow, a_sButton);
  if (callNamed("objectp", t_rButton)) {
  setThePropOf(t_rButton, "pButtonText", a_sText);
  setThePropOf(t_rButton, "pCachedImgs", new LingoPropList([]));
  callMethod("changeState", t_rButton, symbol("up"))
  }

}

