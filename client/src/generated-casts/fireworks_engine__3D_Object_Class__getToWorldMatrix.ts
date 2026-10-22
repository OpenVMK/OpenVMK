// fireworks_engine.cct / 3D Object Class / getToWorldMatrix

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getToWorldMatrix(_me: LingoMe) {
  if (meProp(_me, "m_bWorldTransformValid")) {
  return meProp(_me, "m_pWorldTransformMtx");
  } else {
  var tParents = new LingoList([]);
  var tPNode = callMethod("getParent", _me);
  while ((lingoTruthy(callNamed("voidp", tPNode)) ? 0 : 1)) {
  callMethod("addAt", tParents, 1, tPNode)
  tPNode = callMethod("getParent", tPNode);
  }

  var tNewMatrix = callNamed("new", meProp(_me, "m_matrixSrc"), 4, 4);
  callMethod("loadIdentity", tNewMatrix)
  for (var tNode of tParents.toArray()) {
  callMethod("multiply", tNewMatrix, callMethod("getTransform", tNode), tNewMatrix)
  }

  callMethod("multiply", tNewMatrix, meProp(_me, "m_pTransformMtx"), tNewMatrix)
  setMeProp(_me, "m_pWorldTransformMtx", tNewMatrix);
  setMeProp(_me, "m_bWorldTransformValid", 1);
  return meProp(_me, "m_pWorldTransformMtx");
  }

}

