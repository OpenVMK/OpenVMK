// minigame_lobby.cct / CGameContainer / UpdateParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateParameters(_me: LingoMe) {
  var tGameID = callMethod("getaProp", meProp(_me, "m_mp_parameters"), "GameID");
  callMethod("SendSetGameData", callMethod("getHandler", callNamed("getThread", "lobby")), tGameID.value, meProp(_me, "m_mp_parameters"))
}

