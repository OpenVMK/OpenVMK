// fireworks_engine.cct / 3D Object Manager Class / newObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function newObject(_me: LingoMe, p_ID: LingoValue, p_pDataSet: LingoValue, p_pTransformMtx: LingoValue, p_pParent: LingoValue, p_lChildren: LingoValue) {
  var t_ID = lingoBinary("join", "3DObject:", theProperty("milliSeconds"));
  if (lingoBinary("neq", p_ID, undefined)) {
  t_ID = p_ID;
  }

  var t_object = callNamed("createObject", t_ID, "3D Object Class");
  callMethod("initObject", t_object, p_pDataSet, p_pTransformMtx, p_pParent, p_lChildren)
  callMethod("append", meProp(_me, "m_lObjectPile"), t_object)
  return t_object;
}

