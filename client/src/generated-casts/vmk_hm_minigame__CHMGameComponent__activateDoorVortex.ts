// vmk_hm_minigame.cct / CHMGameComponent / activateDoorVortex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function activateDoorVortex(_me: LingoMe, i_iFurniRef: LingoValue, a_iType: LingoValue) {
  var t_rDoor = meProp(_me, "m_ar_rDoors")[callNamed("string", i_iFurniRef)];
  if ((lingoTruthy(callNamed("voidp", t_rDoor)) ? 0 : 1)) {
  callMethod("activateVortex", t_rDoor, a_iType)
  }

}

