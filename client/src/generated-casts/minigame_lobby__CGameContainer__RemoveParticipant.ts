// minigame_lobby.cct / CGameContainer / RemoveParticipant

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveParticipant(_me: LingoMe, i_iParticipantRef: LingoValue) {
  var tParticipant = callMethod("getaProp", meProp(_me, "m_mp_participants"), i_iParticipantRef);
  if ((lingoTruthy(callNamed("voidp", tParticipant)) ? 0 : 1)) {
  callMethod("deleteProp", meProp(_me, "m_mp_participants"), i_iParticipantRef)
  callNamed("removeObject", callMethod("getID", tParticipant))
  }

}

