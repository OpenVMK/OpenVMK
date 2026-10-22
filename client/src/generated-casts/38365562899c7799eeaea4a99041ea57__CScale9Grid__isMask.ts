// 38365562899c7799eeaea4a99041ea57.cct / CScale9Grid / isMask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function isMask(_me: LingoMe) {
  return lingoBinary("or", meProp(_me, "m_rImg").useAlpha, meProp(_me, "m_bMask"));
}

