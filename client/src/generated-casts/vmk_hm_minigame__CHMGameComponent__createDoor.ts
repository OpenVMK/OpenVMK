// vmk_hm_minigame.cct / CHMGameComponent / createDoor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createDoor(_me: LingoMe, i_iFurniRef: LingoValue, i_sRoomDoorRef: LingoValue, i_rLinkObj: LingoValue) {
  var t_rDoor = callNamed("createObject", symbol("random"), "CHMDoor");
  callMethod("Init", t_rDoor, i_sRoomDoorRef, i_rLinkObj)
  meProp(_me, "m_ar_rDoors")[callNamed("string", i_iFurniRef)] = t_rDoor;
}

