// minigame_lobby.cct / CLobbyComponent / SetGameConditions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameConditions(_me: LingoMe, i_ar_data: LingoValue) {
  setMeProp(_me, "m_bDirty", 1);
  setMeProp(_me, "m_ar_GameConditions", i_ar_data);
}

