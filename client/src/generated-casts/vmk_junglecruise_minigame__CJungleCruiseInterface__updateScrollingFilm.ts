// vmk_junglecruise_minigame.cct / CJungleCruiseInterface / updateScrollingFilm

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateScrollingFilm(_me: LingoMe, i_filmStrip: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, "filmstrip");
  if (lingoBinary("neq", tElem, 0)) {
  var tImg = callMethod("GetThumbnails", i_filmStrip);
  callMethod("feedImage", tElem, tImg)
  }

  }

}

