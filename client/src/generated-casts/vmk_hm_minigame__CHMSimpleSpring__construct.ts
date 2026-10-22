// vmk_hm_minigame.cct / CHMSimpleSpring / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iInertia", 0.9);
  setMeProp(_me, "m_iK", 0.02);
  setMeProp(_me, "m_vDestination", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_vLocation", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_iDeltaX", 0);
  setMeProp(_me, "m_iDeltaY", 0);
  return 1;
}

