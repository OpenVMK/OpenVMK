// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / GetMickeysInRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetMickeysInRoom(_me: LingoMe) {
  return meProp(_me, "m_mpHiddenMickeysInRoom");
}

