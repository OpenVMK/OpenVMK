// fireworks_engine.cct / 3D Object Class / setTransform

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTransform(_me: LingoMe, p_pTransformMtx: LingoValue) {
  if ((lingoTruthy(p_pTransformMtx) ? 0 : 1)) {
  callNamed("put", " 3D Object Class : setTransform() : invalid input")
  return 0;
  }

  setMeProp(_me, "m_pTransformMtx", p_pTransformMtx);
  setMeProp(_me, "m_bWorldTransformValid", 0);
  return 1;
}

