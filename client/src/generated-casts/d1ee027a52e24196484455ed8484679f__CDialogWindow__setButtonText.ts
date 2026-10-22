// d1ee027a52e24196484455ed8484679f.cct / CDialogWindow / setButtonText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonText(_me: LingoMe, t_btnname: LingoValue, t_txt: LingoValue) {
  if (callNamed("listp", t_txt)) {
  setMeProp(_me, "m_bSpecialEvents", 1);
  t_txt = t_txt.text;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_btnname)) ? 0 : 1), (lingoTruthy(callNamed("voidp", t_txt)) ? 0 : 1))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
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

