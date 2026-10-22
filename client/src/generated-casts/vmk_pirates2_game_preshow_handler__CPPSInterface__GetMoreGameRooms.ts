// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / GetMoreGameRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetMoreGameRooms(_me: LingoMe) {
  var tConnection = callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK"));
  if (lingoBinary("neq", tConnection, 0)) {
  callMethod("send", tConnection, 36, new LingoPropList([symbol("int"), 1001]))
  }

}

