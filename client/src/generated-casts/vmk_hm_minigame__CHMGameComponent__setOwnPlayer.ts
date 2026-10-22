// vmk_hm_minigame.cct / CHMGameComponent / setOwnPlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setOwnPlayer(_me: LingoMe, a_rPlayer: LingoValue) {
  setMeProp(_me, "m_rOwnPlayer", a_rPlayer);
}

