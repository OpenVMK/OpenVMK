// minigame_lobby.cct / CLobbyComponent / InitService

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitService(_me: LingoMe) {
  setMeProp(_me, "m_bGameListPending", 0);
  setMeProp(_me, "m_bGameDataPending", 0);
  setMeProp(_me, "m_myGameID", undefined);
  setMeProp(_me, "m_bReadyToPlay", 0);
  setMeProp(_me, "m_bDirty", 0);
}

