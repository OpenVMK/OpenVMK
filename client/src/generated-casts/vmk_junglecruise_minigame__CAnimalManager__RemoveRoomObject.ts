// vmk_junglecruise_minigame.cct / CAnimalManager / RemoveRoomObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveRoomObject(_me: LingoMe, a_sClass: LingoValue, a_iRef: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_roomContext"))) ? 0 : 1)) {
  callMethod("_RemoveIndexed", meProp(_me, "m_roomContext"), a_iRef, a_sClass)
  }

}

