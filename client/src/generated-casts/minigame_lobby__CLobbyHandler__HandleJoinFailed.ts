// minigame_lobby.cct / CLobbyHandler / HandleJoinFailed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleJoinFailed(_me: LingoMe, tMsg: LingoValue) {
  var tCode = callMethod("GetIntFrom", tMsg.connection);
  callMethod("DisplayError", callMethod("getInterface", _me), callNamed("getText", lingoBinary("join", "lobby.error.join.", tCode)))
}

