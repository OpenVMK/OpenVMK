// vmk_indy_handler.cct / CSpline3D / IsOutOfBounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsOutOfBounds(_me: LingoMe, t: LingoValue) {
  if (lingoBinary("lt", t, float(0))) {
  return 1;
  }

  if (lingoBinary("gte", t, lingoBinary("sub", meProp(_me, "m_ar_controlPoints").count, 3))) {
  return 1;
  }

  return 0;
}

