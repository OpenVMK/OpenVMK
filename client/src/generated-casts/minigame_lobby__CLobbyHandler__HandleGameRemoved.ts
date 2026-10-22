// minigame_lobby.cct / CLobbyHandler / HandleGameRemoved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleGameRemoved(_me: LingoMe, tMsg: LingoValue) {
  var tRef = callMethod("GetIntFrom", tMsg.connection);
  callMethod("RemoveGame", callMethod("getComponent", _me), tRef)
}

