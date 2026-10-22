// minigame_lobby.cct / CLobbyComponent / SendParticipantData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendParticipantData(_me: LingoMe, i_AvatarRef: LingoValue, a_mp_keypairs: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myGameID"))) ? 0 : 1)) {
  callMethod("SendParticipantData", callMethod("getHandler", _me), meProp(_me, "m_myGameID"), i_AvatarRef, a_mp_keypairs)
  }

}

