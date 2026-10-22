// vmk_hm_minigame.cct / CCollisionEngineControlledTile / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe, t_iDirection: LingoValue) {
  setMeProp(_me, "m_iDirection", lingoBinary("sub", t_iDirection, 1));
  setMeProp(_me, "m_iDirection", callNamed("max", meProp(_me, "m_iDirection"), 0));
  if (lingoBinary("gt", meProp(_me, "m_iActionCounter"), 0)) {
  setMeProp(_me, "m_iActionCounter", lingoBinary("sub", meProp(_me, "m_iActionCounter"), 1));
  var m_iAction = 13;
  } else {
  m_iAction = 1;
  }

  var t_iTileRef = callMethod("getTileRef", meProp(_me, "m_ar_BoundingObjects")[1]);
  if (lingoBinary("neq", t_iTileRef, meProp(_me, "m_iLastTile"))) {
  setMeProp(_me, "m_iLastTile", t_iTileRef);
  var t_rTile = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), meProp(_me, "m_iLastTile"), "tile");
  if (callNamed("objectp", t_rTile)) {
  } else {
  }

  } else {
  }

}

