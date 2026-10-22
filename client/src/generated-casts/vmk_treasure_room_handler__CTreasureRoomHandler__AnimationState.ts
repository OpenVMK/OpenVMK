// vmk_treasure_room_handler.cct / CTreasureRoomHandler / AnimationState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AnimationState(_me: LingoMe, tMsg: LingoValue) {
  var t_iAnimRef = callMethod("GetIntFrom", tMsg.connection);
  var t_iState = callMethod("GetIntFrom", tMsg.connection);
  callNamed("put", lingoBinary("joinPad", t_iAnimRef, t_iState))
  switch (t_iState) {
case 0:
  callMethod("TreasureChestClosed", callMethod("getComponent", _me), t_iAnimRef)
  break;
case 1:
  callMethod("TreasureChestOpenWithTreasure", callMethod("getComponent", _me), t_iAnimRef)
  break;
case 2:
  callMethod("TreasureChestOpenEmpty", callMethod("getComponent", _me), t_iAnimRef)
  break;
  default:
  callNamed("error", _me, "Unknown animation state", symbol("AnimationState"))
  }

}

