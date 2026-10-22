// vmk_hm_minigame.cct / CHMGameComponent / CreatePuff

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatePuff(_me: LingoMe, t_iGhostRef: LingoValue, t_iAvatarRef: LingoValue) {
  setMeProp(_me, "m_iPuffCounter", lingoBinary("add", meProp(_me, "m_iPuffCounter"), 1));
  var t_rGhost = callMethod("GetMGObject", callMethod("getComponent", callNamed("getThread", "minigame")), t_iGhostRef);
  var t_iDirection = 0;
  var t_iTeam = 1;
  var t_vPos = callNamed("vector", 0, 0, 0);
  if (callNamed("objectp", t_rGhost)) {
  t_vPos = callMethod("GetAbsPos", t_rGhost);
  t_iDirection = callMethod("GetVisual", t_rGhost).m_iDirection;
  t_iTeam = callMethod("GetParam", t_rGhost, "Team");
  }

  var tProps = new LingoPropList([]);
  tProps["Reference"] = meProp(_me, "m_iPuffCounter");
  tProps["Avatar"] = t_iAvatarRef;
  tProps["Ghost"] = t_iGhostRef;
  tProps["Direction"] = t_iDirection;
  tProps["Team"] = t_iTeam;
  tProps["WorldPosition"] = t_vPos;
  var t_rObj = callMethod("CreateRoomObject", _me, "hm_puff", meProp(_me, "m_iPuffCounter"), tProps);
  callMethod("SetAbsPos", t_rObj, t_vPos)
  callMethod("Init", callMethod("GetFactor", t_rObj))
  callMethod("append", meProp(_me, "m_ar_GhostPuffs"), t_rObj)
}

