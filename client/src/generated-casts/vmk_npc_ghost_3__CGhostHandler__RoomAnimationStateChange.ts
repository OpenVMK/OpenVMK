// vmk_npc_ghost_3.cct / CGhostHandler / RoomAnimationStateChange

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
  callMethod("StayHidden", callMethod("getComponent", _me))
  break;
case 1:
  callMethod("Appear", callMethod("getComponent", _me))
  break;
case 2:
  callMethod("idle", callMethod("getComponent", _me))
  break;
case 3:
  callMethod("speak", callMethod("getComponent", _me))
  break;
case 4:
  callMethod("DisAppear", callMethod("getComponent", _me))
  break;
  }

}

