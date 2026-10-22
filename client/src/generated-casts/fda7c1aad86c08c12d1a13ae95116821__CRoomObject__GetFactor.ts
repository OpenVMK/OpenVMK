// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObject / GetFactor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetFactor(_me: LingoMe, _this: LingoValue) {
  return meProp(_me, "m_rFactor");
}

