// minigame_lobby.cct / CLobbyComponent / SetGameListReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameListReceived(_me: LingoMe, i_bState: LingoValue) {
  setMeProp(_me, "m_bGameListPending", (lingoTruthy(i_bState) ? 0 : 1));
  callMethod("CreateGameListContent", callMethod("getInterface", _me))
}

