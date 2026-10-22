// minigame_lobby.cct / CLobbyComponent / QueryGameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QueryGameList(_me: LingoMe) {
  setMeProp(_me, "m_bGameListPending", 1);
  callMethod("SendListGames", callMethod("getHandler", _me))
}

