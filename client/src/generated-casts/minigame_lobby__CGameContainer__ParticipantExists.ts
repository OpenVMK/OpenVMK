// minigame_lobby.cct / CGameContainer / ParticipantExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParticipantExists(_me: LingoMe, a_iParticipantRef: LingoValue) {
  return (lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_participants"), a_iParticipantRef))) ? 0 : 1);
}

