// minigame_lobby.cct / CLobbyComponent / QueryGameData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QueryGameData(_me: LingoMe, i_ID: LingoValue) {
  setMeProp(_me, "m_bGameDataPending", 1);
  callMethod("SendGetGameData", callMethod("getHandler", _me), i_ID)
}

