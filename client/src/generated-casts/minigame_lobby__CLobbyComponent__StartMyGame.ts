// minigame_lobby.cct / CLobbyComponent / StartMyGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartMyGame(_me: LingoMe) {
  callMethod("SendStartGame", callMethod("getHandler", _me), meProp(_me, "m_myGameID"))
}

