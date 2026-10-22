// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage2 / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_bDataGathered", 1);
  setMeProp(_me, "m_ar_AvatarData", undefined);
  callMethod("updateStats", _this)
  return 1;
}

