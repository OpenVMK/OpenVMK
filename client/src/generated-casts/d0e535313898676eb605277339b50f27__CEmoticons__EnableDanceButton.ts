// d0e535313898676eb605277339b50f27.cct / CEmoticons / EnableDanceButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EnableDanceButton(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", t_rWnd, "emoticons.dance.button")) {
  callMethod("Activate", callMethod("getElement", t_rWnd, "emoticons.dance.button"))
  }

  }

}

