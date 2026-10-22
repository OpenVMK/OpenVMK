// vmk_hm_minigame.cct / CCollisionEngineControlledTile / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rAvatarObject"))) ? 0 : 1)) {
  callMethod("initAvatar", _me)
  return 1;
  }

  var t_iLastDirection = meProp(_me, "m_iMoveDirection");
  var t_iDir = callMethod("ReadKeys", _me)[1];
  if (lingoBinary("neq", t_iDir, meProp(_me, "m_iMoveDirection"))) {
  setMeProp(_me, "m_iMoveDirection", t_iDir);
  callMethod("setDirection", _me, meProp(_me, "m_iMoveDirection"))
  if (lingoBinary("eq", t_iLastDirection, -float(1))) {
  callNamed("executeMessage", symbol("ActivateCollisionEngine"), 1)
  }

  }

  if (callMethod("ReadKeys", _me)[2]) {
  callMethod("startAction", _me)
  }

}

