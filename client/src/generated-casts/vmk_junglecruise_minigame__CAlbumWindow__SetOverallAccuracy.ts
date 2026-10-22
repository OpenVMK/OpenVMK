// vmk_junglecruise_minigame.cct / CAlbumWindow / SetOverallAccuracy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOverallAccuracy(_me: LingoMe, a_fAccuracy: LingoValue) {
  setThePropOf(meProp(_me, "m_mp_stats"), "accuracy", a_fAccuracy);
}

