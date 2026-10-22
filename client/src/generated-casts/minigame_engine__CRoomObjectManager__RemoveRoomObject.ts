// minigame_engine.cct / CRoomObjectManager / RemoveRoomObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveRoomObject(_me: LingoMe, a_sClass: LingoValue, a_iRef: LingoValue) {
  var t_rRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  if ((lingoTruthy(callNamed("voidp", t_rRoomContext)) ? 0 : 1)) {
  callMethod("_RemoveIndexed", t_rRoomContext, a_iRef, a_sClass)
  }

}

