// fireworks_engine.cct / Hierarchic 3D Pipeline Class / setView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setView(_me: LingoMe, p_pView: LingoValue) {
  setMeProp(_me, "m_pView", p_pView);
}

