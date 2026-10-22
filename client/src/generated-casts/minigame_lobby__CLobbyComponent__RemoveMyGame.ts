// minigame_lobby.cct / CLobbyComponent / RemoveMyGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveMyGame(_me: LingoMe) {
  callMethod("SendRemoveGame", callMethod("getHandler", _me), meProp(_me, "m_myGameID"))
  setMeProp(_me, "m_myGameID", undefined);
}

