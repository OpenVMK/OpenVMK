// minigame_lobby.cct / CLobbyHandler / RequestGameConditions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestGameConditions(_me: LingoMe) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 651, new LingoList([]))
}

