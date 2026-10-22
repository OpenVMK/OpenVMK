// vmk_junglecruise_minigame.cct / CFilmStrip / setFilmAmount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFilmAmount(_me: LingoMe, i_iAmount: LingoValue) {
  setMeProp(_me, "m_totalFrames", i_iAmount);
}

