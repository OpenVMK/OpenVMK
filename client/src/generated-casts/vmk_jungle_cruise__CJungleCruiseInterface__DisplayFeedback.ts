// vmk_jungle_cruise.cct / CJungleCruiseInterface / DisplayFeedback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayFeedback(_me: LingoMe, i_quality: LingoValue) {
  callMethod("display", meProp(_me, "m_feedback"), theProperty("mouseLoc"), i_quality)
}

