// fireworks_engine.cct / 3D Object Class / unParent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unParent(_me: LingoMe) {
  if (meProp(_me, "m_pParent")) {
  callMethod("removeChild", meProp(_me, "m_pParent"), _me)
  }

  var m_parent = undefined;
  setMeProp(_me, "m_bWorldTransformValid", 0);
  return 1;
}

