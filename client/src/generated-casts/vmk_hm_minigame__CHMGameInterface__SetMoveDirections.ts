// vmk_hm_minigame.cct / CHMGameInterface / SetMoveDirections

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMoveDirections(_me: LingoMe, i_ar_directions: LingoValue) {
  setMeProp(_me, "m_ar_directions", i_ar_directions);
}

