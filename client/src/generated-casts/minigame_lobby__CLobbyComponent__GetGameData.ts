// minigame_lobby.cct / CLobbyComponent / GetGameData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetGameData(_me: LingoMe, i_ID: LingoValue) {
  return callMethod("getaProp", callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID), symbol("data"));
  setMeProp(_me, "m_bDirty", 0);
}

