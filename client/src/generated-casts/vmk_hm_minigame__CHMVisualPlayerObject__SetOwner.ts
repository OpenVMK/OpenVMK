// vmk_hm_minigame.cct / CHMVisualPlayerObject / SetOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOwner(_me: LingoMe, i_rOwner: LingoValue) {
  setMeProp(_me, "m_rOwner", i_rOwner);
}

