// vmk_fireworks_minigame.cct / CFireworksGameInterface / setFireworksActionSpriteVicinity

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFireworksActionSpriteVicinity(_me: LingoMe, i_index: LingoValue, i_fVicinity: LingoValue) {
  meProp(_me, "m_ar_vicinityList")[i_index] = i_fVicinity;
}

