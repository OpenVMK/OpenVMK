// d0e535313898676eb605277339b50f27.cct / CEmoticons / _ChangeDanceState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangeDanceState(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bDanceState", 0);
  callMethod("_Close", _this)
}

