// vmk_pirates2_minigame.cct / CPiratesSound / PlayFanfare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayFanfare(_me: LingoMe) {
  callMethod("playFx", _me, meProp(_me, "m_mp_sSoundList")["Fanfare"][1])
}

