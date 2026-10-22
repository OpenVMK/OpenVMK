// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / setButtonTxt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonTxt(_me: LingoMe, t_btnname: LingoValue, t_txt: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_btnname)) ? 0 : 1), (lingoTruthy(callNamed("voidp", t_txt)) ? 0 : 1))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tBtn = callMethod("getElement", tWndObj, t_btnname);
  if (lingoBinary("neq", tBtn, 0)) {
  setThePropOf(tBtn, "pButtonText", t_txt);
  setThePropOf(tBtn, "pCachedImgs", new LingoPropList([]));
  callMethod("changeState", tBtn, symbol("up"))
  }

  }

  }

}

