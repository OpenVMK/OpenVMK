// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / setFilmAmount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFilmAmount(_me: LingoMe, a_iAmount: LingoValue) {
  setMeProp(_me, "m_filmAmount", a_iAmount);
  callMethod("DisplayFilmAmount", callMethod("getInterface", _me), meProp(_me, "m_filmAmount"))
}

