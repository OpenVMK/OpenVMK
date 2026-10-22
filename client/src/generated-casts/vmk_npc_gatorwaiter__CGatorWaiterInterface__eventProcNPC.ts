// vmk_npc_gatorwaiter.cct / CGatorWaiterInterface / eventProcNPC

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcNPC(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  if (theProperty("doubleClick")) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNPC = callMethod("Search", tRoomContext, "TYPE", "4009");
  callNamed("put", lingoBinary("joinPad", "eventProcNPC found", tNPC))
  if ((lingoTruthy(callNamed("voidp", tNPC)) ? 0 : 1)) {
  callMethod("selectNPC", callMethod("getHandler", _me), callNamed("integer", callMethod("GetParam", tNPC, "REF")))
  } else {
  callNamed("put", "The NPC Gator Waiter Room Item was not found")
  }

  }

  }

}

