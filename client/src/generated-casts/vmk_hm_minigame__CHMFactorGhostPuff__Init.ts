// vmk_hm_minigame.cct / CHMFactorGhostPuff / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe) {
  var t_iAvatarRef = callMethod("GetParam", callMethod("getObject", _me), "Avatar");
  var t_iGhostRef = callMethod("GetParam", callMethod("getObject", _me), "Ghost");
  var t_rAvatarPlayer = callMethod("GetMGObject", callMethod("getComponent", callNamed("getThread", "minigame")), t_iAvatarRef);
  var t_rGhost = callMethod("GetMGObject", callMethod("getComponent", callNamed("getThread", "minigame")), t_iGhostRef);
  if (lingoBinary("and", callNamed("objectp", t_rAvatarPlayer), callNamed("objectp", t_rGhost))) {
  var t_vPos = callMethod("GetAbsPos", callMethod("GetMGObject", callMethod("getComponent", callNamed("getThread", "minigame")), t_iGhostRef));
  callMethod("SetAbsPos", callMethod("getObject", _me), t_vPos)
  setMeProp(_me, "m_rAvatar", callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("GetParam", t_rAvatarPlayer, "Owner"), "avatar"));
  setMeProp(_me, "m_bInit", 1);
  }

}

