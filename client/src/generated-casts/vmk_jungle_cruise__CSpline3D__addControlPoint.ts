// vmk_jungle_cruise.cct / CSpline3D / addControlPoint

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addControlPoint(_me: LingoMe, tKnot: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_controlPoints"), tKnot)
}

