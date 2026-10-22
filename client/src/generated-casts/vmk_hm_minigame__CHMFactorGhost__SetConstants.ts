// vmk_hm_minigame.cct / CHMFactorGhost / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  setMeProp(_me, "m_iMood", 0);
  setMeProp(_me, "m_fTurnSpacing", 0.3);
  setMeProp(_me, "m_iMoveDelay", callMethod("GetParam", callMethod("getObject", _me), "GameParams")[1]);
  var t_vWorldPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var t_vePos = callNamed("vector", t_vWorldPos.x, t_vWorldPos.y, t_vWorldPos.z);
  setMeProp(_me, "m_rSpring", callNamed("createObject", symbol("random"), "CHMSimpleSpring"));
  callMethod("setAnchorPoint", meProp(_me, "m_rSpring"), t_vePos)
  callMethod("setBobPosition", meProp(_me, "m_rSpring"), t_vePos)
}

