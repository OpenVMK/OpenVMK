// vmk_tutorial.cct / CJungleCruiseComponent / initializeWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initializeWindow(_me: LingoMe) {
  if ((lingoTruthy(callMethod("GetGameEnd", _me)) ? 0 : 1)) {
  if ((lingoTruthy(meProp(_me, "m_bInitializedFully")) ? 0 : 1)) {
  if (lingoBinary("neq", meProp(_me, "m_boat"), 0)) {
  callNamed("put", "mmmok")
  callMethod("showJCInterface", callMethod("getInterface", _me))
  setMeProp(_me, "m_bInitializedFully", 1);
  }

  }

  }

}

