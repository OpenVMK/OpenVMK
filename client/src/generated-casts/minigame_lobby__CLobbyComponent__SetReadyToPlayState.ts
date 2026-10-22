// minigame_lobby.cct / CLobbyComponent / SetReadyToPlayState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetReadyToPlayState(_me: LingoMe, i_bState: LingoValue) {
  setMeProp(_me, "m_bReadyToPlay", i_bState);
  setMeProp(_me, "m_bDirty", 1);
  callMethod("SendSetReadyToPlay", callMethod("getHandler", _me), i_bState)
}

