// vmk_hm_minigame.cct / CHMFactorGhost / SetMoveTarget

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMoveTarget(_me: LingoMe, a_vPos: LingoValue, i_iDirection: LingoValue, i_iMood: LingoValue) {
  switch (i_iMood) {
case 0:
  setMeProp(_me, "m_iMoveDelay", 3);
  break;
case 1:
  setMeProp(_me, "m_iMoveDelay", 2);
  break;
case 2:
  setMeProp(_me, "m_iMoveDelay", 2);
  break;
  default:
  setMeProp(_me, "m_iMoveDelay", 3);
  }

  callMethod("SetParam", callMethod("getObject", _me), "WorldPosition", a_vPos)
  callMethod("setAnchorPoint", meProp(_me, "m_rSpring"), callNamed("vector", a_vPos.x, a_vPos.y, a_vPos.z))
  if (meProp(_me, "m_bDebugMotion")) {
  callNamed("trace", lingoBinary("joinPad", "Ghost debug setAnchorpoint:", new LingoList([a_vPos.x, a_vPos.y, a_vPos.z])))
  }

  if ((lingoTruthy(callNamed("voidp", i_iMood)) ? 0 : 1)) {
  setMeProp(_me, "m_iMood", i_iMood);
  }

  callMethod("setDirection", callMethod("GetVisual", callMethod("getObject", _me)), i_iDirection, i_iMood)
  callMethod("SyncGameParameters", _me)
}

