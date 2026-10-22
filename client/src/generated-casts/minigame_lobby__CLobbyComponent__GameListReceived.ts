// minigame_lobby.cct / CLobbyComponent / GameListReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GameListReceived(_me: LingoMe) {
  return (lingoTruthy(meProp(_me, "m_bGameListPending")) ? 0 : 1);
}

