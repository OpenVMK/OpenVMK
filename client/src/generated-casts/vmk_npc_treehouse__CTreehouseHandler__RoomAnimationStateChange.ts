// vmk_npc_treehouse.cct / CTreehouseHandler / RoomAnimationStateChange

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RoomAnimationStateChange(_me: LingoMe, tMsg: LingoValue) {
  var tAnimationRef = callMethod("GetIntFrom", tMsg.connection);
  var tAnimationNewState = callMethod("GetIntFrom", tMsg.connection);
  switch (tAnimationNewState) {
case 0:
  break;
case 1:
  callMethod("LookLeftAndRight", callMethod("getComponent", _me))
  break;
case 2:
  callMethod("PointSword", callMethod("getComponent", _me))
  break;
case 3:
  callMethod("climbUpMastSlideDownRope", callMethod("getComponent", _me))
  break;
case 4:
  callMethod("steerBoat", callMethod("getComponent", _me))
  break;
case 5:
  callMethod("lookAndSpeak", callMethod("getComponent", _me))
  break;
case 6:
  callMethod("climbUpRopeSlideDownMast", callMethod("getComponent", _me))
  break;
  }

}

