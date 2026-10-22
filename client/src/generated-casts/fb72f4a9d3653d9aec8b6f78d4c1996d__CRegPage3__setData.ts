// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage3 / setData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setData(_me: LingoMe, _this: LingoValue, a_mpData: LingoValue) {
  setMeProp(_me, "m_mpDataToServer", a_mpData);
}

