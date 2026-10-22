// vmk_junglecruise_minigame.cct / CFilmStrip / AddFilm

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFilm(_me: LingoMe, i_iAmount: LingoValue) {
  callMethod("setFilmAmount", _me, lingoBinary("add", meProp(_me, "m_totalFrames"), i_iAmount))
}

