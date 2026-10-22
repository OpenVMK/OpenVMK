// core.old.cct / CBigInt16 / Compare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Compare(_me: LingoMe, _this: LingoValue, a_rOperand: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_iLength"), a_rOperand.m_iLength)) {
  }

  return 0;
}

