// minigame_lobby.cct / CLobbyComponent / GetGameByIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetGameByIndex(_me: LingoMe, i_iIndex: LingoValue) {
  var tOut = undefined;
  if (lingoBinary("and", lingoBinary("gte", i_iIndex, 1), lingoBinary("lte", i_iIndex, meProp(_me, "m_mp_games").count))) {
  tOut = meProp(_me, "m_mp_games")[i_iIndex].data;
  }

  setMeProp(_me, "m_bDirty", 0);
  return tOut;
}

