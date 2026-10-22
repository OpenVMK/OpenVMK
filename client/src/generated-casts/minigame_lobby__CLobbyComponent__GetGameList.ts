// minigame_lobby.cct / CLobbyComponent / GetGameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetGameList(_me: LingoMe) {
  return meProp(_me, "m_mp_games");
  setMeProp(_me, "m_bDirty", 0);
}

