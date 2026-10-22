// minigame_lobby.cct / CLobbyHandler / HandleReadyToPlay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleReadyToPlay(_me: LingoMe, tMsg: LingoValue) {
  var tstate = callMethod("GetIntFrom", tMsg.connection);
  callMethod("MarkReadyToPlayState", callMethod("getComponent", _me), tstate)
}

