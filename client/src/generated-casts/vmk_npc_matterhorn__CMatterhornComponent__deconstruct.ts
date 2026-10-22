// vmk_npc_matterhorn.cct / CMatterhornComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("yetiRoar"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("yetiIdle"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("yetiPhone"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("yetiSnowball"), callMethod("getID", _me))
  return 1;
}

