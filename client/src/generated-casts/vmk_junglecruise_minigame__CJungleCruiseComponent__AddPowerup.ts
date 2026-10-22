// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / AddPowerup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddPowerup(_me: LingoMe, i_iId: LingoValue, i_type: LingoValue) {
  if (callMethod("AddOnePowerup", meProp(_me, "m_powerupMgr"), i_iId, i_type)) {
  callMethod("playFx", _me, "power_up_2")
  }

  callMethod("updatePowerups", callMethod("getInterface", _me))
}

