// minigame_engine_overrides.cct /  / _SetParticipantList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetParticipantList(_me: LingoMe, a_mp_List: LingoValue) {
  setThePropOf(_me, "m_mp_participants", callMethod("duplicate", a_mp_List));
}

