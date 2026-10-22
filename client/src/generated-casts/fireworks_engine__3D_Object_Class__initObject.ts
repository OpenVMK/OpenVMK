// fireworks_engine.cct / 3D Object Class / initObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initObject(_me: LingoMe, p_pDataSet: LingoValue, p_pTransformMtx: LingoValue, p_pParent: LingoValue, p_lChildren: LingoValue) {
  setMeProp(_me, "m_pTransformMtx", callNamed("new", meProp(_me, "m_matrixSrc"), 4, 4));
  callMethod("loadIdentity", meProp(_me, "m_pTransformMtx"))
  setMeProp(_me, "m_pWorldTransformMtx", callMethod("duplicate", meProp(_me, "m_pTransformMtx")));
  setMeProp(_me, "m_bWorldTransformValid", 1);
  setMeProp(_me, "m_pDataSet", new LingoList([]));
  setMeProp(_me, "m_pParent", undefined);
  setMeProp(_me, "m_ar_Children", new LingoList([]));
  if (lingoBinary("neq", p_pDataSet, undefined)) {
  setMeProp(_me, "m_pDataSet", p_pDataSet);
  }

  if (lingoBinary("neq", p_pTransformMtx, undefined)) {
  setMeProp(_me, "m_pTransformMtx", p_pTransformMtx);
  }

  if (lingoBinary("neq", p_pParent, undefined)) {
  setMeProp(_me, "m_pParent", p_pParent);
  }

  if (lingoBinary("neq", p_lChildren, undefined)) {
  setMeProp(_me, "m_ar_Children", p_lChildren);
  }

}

