// minigame_lobby.cct / CLobbyComponent / JoinGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function JoinGame(_me: LingoMe, i_ID: LingoValue, i_iTeam: LingoValue, a_mp_keypairs: LingoValue) {
  callMethod("SendJoinGame", callMethod("getHandler", _me), i_ID, i_iTeam, a_mp_keypairs)
  setMeProp(_me, "m_myGameID", i_ID);
}

