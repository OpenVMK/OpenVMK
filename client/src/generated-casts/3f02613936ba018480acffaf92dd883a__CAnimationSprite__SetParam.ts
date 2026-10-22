// 3f02613936ba018480acffaf92dd883a.cct / CAnimationSprite / SetParam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetParam(_me: LingoMe, i_iParam: LingoValue, i_iParamValue: LingoValue) {
  meProp(_me, "m_ar_spriteData")[i_iParam] = i_iParamValue;
}

