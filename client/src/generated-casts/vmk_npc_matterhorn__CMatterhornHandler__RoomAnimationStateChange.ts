// vmk_npc_matterhorn.cct / CMatterhornHandler / RoomAnimationStateChange

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
  callMethod("idle", callMethod("getComponent", _me))
  break;
case 1:
  callMethod("RoarAndSpeak", callMethod("getComponent", _me))
  break;
case 2:
  callMethod("AnswerPhone", callMethod("getComponent", _me))
  break;
case 3:
  callMethod("ThrowSnowball", callMethod("getComponent", _me))
  break;
  }

}

