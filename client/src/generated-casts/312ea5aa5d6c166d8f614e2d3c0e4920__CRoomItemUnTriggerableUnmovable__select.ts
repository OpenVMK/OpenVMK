// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemUnTriggerableUnmovable / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "RoomType"), symbol("public"))) {
  var t_rEventProcessor = callNamed("getObject", "RoomEventProcessor");
  if (lingoBinary("neq", t_rEventProcessor, 0)) {
  callMethod("reset", t_rEventProcessor)
  }

  }

}

