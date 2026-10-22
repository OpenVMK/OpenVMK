// vmk_junglecruise_minigame.cct / CAnimalManager / GetAnimalID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAnimalID(_me: LingoMe, a_iRef: LingoValue) {
  var tRoomObj = callMethod("_AccessIndexed", meProp(_me, "m_roomContext"), a_iRef, "animal");
  return callMethod("GetParam", tRoomObj, "Type");
}

