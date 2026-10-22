// vmk_npc_shrunken_neds_shop.cct / CSNSHandler / RoomAnimationStateChange

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
  callMethod("LookAtCashRegister", callMethod("getComponent", _me))
  break;
case 2:
  callMethod("WiggleAbout", callMethod("getComponent", _me))
  break;
case 3:
  callMethod("speak", callMethod("getComponent", _me))
  break;
case 4:
  callMethod("blink", callMethod("getComponent", _me))
  break;
  }

}

