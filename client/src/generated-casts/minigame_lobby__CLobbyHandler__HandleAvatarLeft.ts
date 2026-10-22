// minigame_lobby.cct / CLobbyHandler / HandleAvatarLeft

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleAvatarLeft(_me: LingoMe, tMsg: LingoValue) {
  var tGameRef = callMethod("GetIntFrom", tMsg.connection);
  var tAvatarRef = callMethod("GetIntFrom", tMsg.connection);
  callMethod("RemoveAvatarFromGame", callMethod("getComponent", _me), tGameRef, tAvatarRef)
}

