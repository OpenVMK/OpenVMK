// minigame_lobby.cct / CLobbyComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var tGame of meProp(_me, "m_mp_games").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tGame.data)) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", tGame.data))
  }

  }

  return 1;
}

