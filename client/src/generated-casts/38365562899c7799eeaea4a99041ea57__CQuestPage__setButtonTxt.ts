// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / setButtonTxt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setButtonTxt(_me: LingoMe, tWndObj: LingoValue, t_btnname: LingoValue, t_txt: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_btnname)) ? 0 : 1), (lingoTruthy(callNamed("voidp", t_txt)) ? 0 : 1))) {
  if (callNamed("objectp", tWndObj)) {
  var tBtn = callMethod("getElement", tWndObj, t_btnname);
  if (lingoBinary("neq", tBtn, 0)) {
  setThePropOf(tBtn, "pButtonText", t_txt);
  setThePropOf(tBtn, "pCachedImgs", new LingoPropList([]));
  callMethod("changeState", tBtn, symbol("up"))
  }

  }

  }

}

