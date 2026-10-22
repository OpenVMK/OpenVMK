// minigame_lobby.cct / CGameContainer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var tParticipant of meProp(_me, "m_mp_participants").toArray()) {
  callNamed("removeObject", callMethod("getID", tParticipant))
  }

  setMeProp(_me, "m_mp_participants", new LingoPropList([]));
  setMeProp(_me, "m_mp_parameters", new LingoPropList([]));
  return 1;
}

