// vmk_junglecruise_minigame.cct / CJungleCruiseInterface / updateScoreinfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateScoreinfo(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tScore = callMethod("GetScore", callMethod("getComponent", _me));
  callMethod("setText", callMethod("getElement", tWndObj, "jc.score"), tScore)
  }

}

