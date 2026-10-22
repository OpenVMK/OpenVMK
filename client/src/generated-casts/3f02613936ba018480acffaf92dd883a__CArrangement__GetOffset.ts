// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / GetOffset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetOffset(_me: LingoMe, i_anim: LingoValue) {
  return meProp(_me, "m_ar_animContainers")[i_anim].offset;
}

