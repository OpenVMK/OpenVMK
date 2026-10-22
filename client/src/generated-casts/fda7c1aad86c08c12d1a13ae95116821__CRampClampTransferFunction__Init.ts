// fda7c1aad86c08c12d1a13ae95116821.cct / CRampClampTransferFunction / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, a_rangestart: LingoValue, a_rangeend: LingoValue, a_param1: LingoValue, a_param2: LingoValue, a_param3: LingoValue) {
  setMeProp(_me, "m_fRangeMin", callNamed("float", a_rangestart));
  setMeProp(_me, "m_fRangeMax", callNamed("float", a_rangeend));
  setMeProp(_me, "m_fN", callNamed("float", a_param1));
  setMeProp(_me, "m_fSlope", callNamed("float", a_param2));
  setMeProp(_me, "m_syFinish", callNamed("symbol", a_param3));
}

