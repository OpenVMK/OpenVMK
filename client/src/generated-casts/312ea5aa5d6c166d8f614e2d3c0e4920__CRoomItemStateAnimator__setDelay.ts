// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemStateAnimator / setDelay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDelay(_me: LingoMe, t_iDelay: LingoValue) {
  if (callNamed("integerp", t_iDelay)) {
  setMeProp(_me, "m_iMaxDelay", t_iDelay);
  }

}

