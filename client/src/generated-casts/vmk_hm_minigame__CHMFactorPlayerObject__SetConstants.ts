// vmk_hm_minigame.cct / CHMFactorPlayerObject / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  setMeProp(_me, "m_i_statebits", 0);
  setMeProp(_me, "m_score", 0);
  if ((lingoTruthy(callNamed("voidp", callMethod("getObject", _me))) ? 0 : 1)) {
  var tMyAvatarRef = callMethod("GetParam", callMethod("getObject", _me), "Owner");
  if (lingoBinary("eq", tMyAvatarRef, -float(1))) {
  setMeProp(_me, "m_rAvatar", undefined);
  } else {
  setMeProp(_me, "m_rAvatar", callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), tMyAvatarRef, "avatar"));
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rAvatar"))) ? 0 : 1)) {
  callMethod("SetName", _me, callMethod("GetParam", meProp(_me, "m_rAvatar"), "NAME"))
  if (lingoBinary("eq", callMethod("GetParam", meProp(_me, "m_rAvatar"), "NAME"), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  callMethod("setOwnPlayer", callMethod("getComponent", callNamed("getThread", "hauntedmansiongame")), callMethod("getObject", _me))
  }

  setThePropOf(callMethod("GetFactor", meProp(_me, "m_rAvatar")), "m_iStatusDelay", 300);
  callMethod("initStatus", callMethod("GetVisual", callMethod("getObject", _me)), meProp(_me, "m_rAvatar"))
  } else {
  }

  }

  }

}

