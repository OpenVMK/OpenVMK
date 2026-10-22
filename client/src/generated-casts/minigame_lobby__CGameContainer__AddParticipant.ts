// minigame_lobby.cct / CGameContainer / AddParticipant

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddParticipant(_me: LingoMe, i_iParticipantRef: LingoValue) {
  var t_rParticipant = callNamed("createObject", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Game", theProperty("milliSeconds")), "Participant:"), i_iParticipantRef), "CGameParticipantContainer");
  if (lingoBinary("eq", t_rParticipant, 0)) {
  return undefined;
  }

  callMethod("addProp", meProp(_me, "m_mp_participants"), i_iParticipantRef, t_rParticipant)
  return callMethod("getaProp", meProp(_me, "m_mp_participants"), i_iParticipantRef);
}

