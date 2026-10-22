// minigame_engine_overrides.cct /  / GetObjectsByCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetObjectsByCode(_me: LingoMe, i_iX: LingoValue) {
  return _me.m_ar_ar_objByType[i_iX];
}

