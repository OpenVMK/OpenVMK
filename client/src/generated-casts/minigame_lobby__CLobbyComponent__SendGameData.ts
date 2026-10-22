// minigame_lobby.cct / CLobbyComponent / SendGameData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendGameData(_me: LingoMe, a_mp_keypairs: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myGameID"))) ? 0 : 1)) {
  callMethod("SendSetGameData", callMethod("getHandler", _me), meProp(_me, "m_myGameID"), a_mp_keypairs)
  }

}

