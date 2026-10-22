// 3f02613936ba018480acffaf92dd883a.cct / CSpriteAnimationObject / GetParam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetParam(_me: LingoMe, a_sParamName: LingoValue) {
  return meProp(_me, "m_ar_params")[a_sParamName];
}

