// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / setButtonText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonText(_me: LingoMe, t_btnname: LingoValue, t_txt: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var tBtn = callMethod("getElement", tWndObj, t_btnname);
  if (lingoBinary("neq", tBtn, 0)) {
  setThePropOf(tBtn, "pButtonText", t_txt);
  setThePropOf(tBtn, "pCachedImgs", new LingoPropList([]));
  callMethod("changeState", tBtn, symbol("up"))
  }

}

