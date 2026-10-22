// minigame_lobby.cct / CLobbyComponent / KickAvatarFromMyGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function KickAvatarFromMyGame(_me: LingoMe, i_AvatarRef: LingoValue) {
  callMethod("SendKickFromGame", callMethod("getHandler", _me), meProp(_me, "m_myGameID"), i_AvatarRef)
}

