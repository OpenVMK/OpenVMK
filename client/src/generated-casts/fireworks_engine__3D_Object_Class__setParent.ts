// fireworks_engine.cct / 3D Object Class / setParent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setParent(_me: LingoMe, p_pObject: LingoValue) {
  if ((lingoTruthy(p_pObject) ? 0 : 1)) {
  callNamed("put", " 3D Object Class : setParent() : invalid input")
  return 0;
  }

  setMeProp(_me, "m_pParent", p_pObject);
  callMethod("addChild", meProp(_me, "m_pParent"), _me)
  setMeProp(_me, "m_bWorldTransformValid", 0);
  return 1;
}

