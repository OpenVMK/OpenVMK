// minigame_lobby.cct / CLobbyComponent / RemoveGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveGame(_me: LingoMe, i_ID: LingoValue) {
  var t_rGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  if (callNamed("objectp", t_rGame)) {
  callNamed("removeObject", callMethod("getID", t_rGame.data))
  }

  callMethod("deleteProp", meProp(_me, "m_mp_games"), i_ID)
  callMethod("CreateGameListContent", callMethod("getInterface", _me))
  setMeProp(_me, "m_bDirty", 1);
  if (lingoBinary("eq", i_ID, meProp(_me, "m_myGameID"))) {
  setMeProp(_me, "m_myGameID", undefined);
  }

}

