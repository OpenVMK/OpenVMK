// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / setWindowElementProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setWindowElementProperty(_me: LingoMe, _this: LingoValue, a_sElem: LingoValue, a_kProperty: LingoValue, a_kValue: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem);
  if (callNamed("objectp", t_rElem)) {
  callMethod("setProperty", t_rElem, a_kProperty, a_kValue)
  }

  }

}

