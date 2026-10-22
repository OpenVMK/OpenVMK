// vmk_junglecruise_minigame.cct / CJungleCruiseFactorBoat / IsBlocked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsBlocked(_me: LingoMe) {
  for (var tBlockState of meProp(_me, "m_mp_blockers").toArray()) {
  if (tBlockState) {
  return 1;
  }

  }

  return 0;
}

