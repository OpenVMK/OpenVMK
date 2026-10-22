// fireworks_engine.cct / 3D Object Class / removeMeFromHierarchy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeMeFromHierarchy(_me: LingoMe) {
  if (meProp(_me, "m_pParent")) {
  callMethod("removeChild", meProp(_me, "m_pParent"), _me)
  for (var i = 1; i <= callMethod("count", meProp(_me, "m_ar_Children")); ++i) {
  callMethod("addChild", meProp(_me, "m_pParent"), meProp(_me, "m_ar_Children")[i])
  }

  }

  setMeProp(_me, "m_bWorldTransformValid", 0);
}

