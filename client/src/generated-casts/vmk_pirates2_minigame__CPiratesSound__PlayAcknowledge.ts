// vmk_pirates2_minigame.cct / CPiratesSound / PlayAcknowledge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayAcknowledge(_me: LingoMe) {
  var tRandom = callNamed("random", meProp(_me, "m_mp_sSoundList")["Acknowledge"].count);
  callMethod("playFx", _me, meProp(_me, "m_mp_sSoundList")["Acknowledge"][tRandom])
}

