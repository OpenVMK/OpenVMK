// minigame_lobby.cct / CLobbyComponent / CurrentGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CurrentGame(_me: LingoMe) {
  setMeProp(_me, "m_bDirty", 0);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myGameID"))) ? 0 : 1)) {
  var t_rGame = callMethod("getaProp", meProp(_me, "m_mp_games"), meProp(_me, "m_myGameID"));
  if (callNamed("objectp", t_rGame)) {
  return t_rGame.data;
  } else {
  setMeProp(_me, "m_myGameID", undefined);
  return undefined;
  }

  } else {
  return undefined;
  }

}

