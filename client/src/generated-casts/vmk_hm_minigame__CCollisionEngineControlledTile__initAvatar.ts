// vmk_hm_minigame.cct / CCollisionEngineControlledTile / initAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initAvatar(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iAvatarRef"))) ? 0 : 1)) {
  if (lingoBinary("gt", meProp(_me, "m_iAvatarRef"), 0)) {
  var t_rAvatarObject = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), meProp(_me, "m_iAvatarRef"), "avatar");
  if (callNamed("objectp", t_rAvatarObject)) {
  setMeProp(_me, "m_rAvatarObject", t_rAvatarObject);
  callMethod("Actions", callMethod("GetVisual", meProp(_me, "m_rAvatarObject")), new LingoList([meProp(_me, "m_iDirection"), meProp(_me, "m_iDirection"), 0, 0, 0, 0, 0, 0, 0]))
  var t_iStatusDelay = callNamed("getVariableValue", "hm.editor.statusdelay");
  if (callNamed("voidp", t_iStatusDelay)) {
  t_iStatusDelay = 300;
  }

  setThePropOf(callMethod("GetFactor", meProp(_me, "m_rAvatarObject")), "m_iStatusDelay", t_iStatusDelay);
  var tCircle = callNamed("createObject", lingoBinary("join", "BoundingTile", callNamed("getUniqueID")), "CCollisionEngineBoundingTile");
  callMethod("Init", tCircle, callMethod("GetAbsPos", meProp(_me, "m_rAvatarObject")))
  callMethod("setClient", tCircle, _me)
  callMethod("append", meProp(_me, "m_ar_BoundingObjects"), tCircle)
  setMeProp(_me, "m_b_collisionInited", 1);
  }

  }

  }

}

