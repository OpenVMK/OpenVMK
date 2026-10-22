// minigame_lobby.cct / CLobbyHandler / SendSetReadyToPlay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendSetReadyToPlay(_me: LingoMe, i_iState: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), callNamed("integer", i_iState)]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 649, tMsg)
}

