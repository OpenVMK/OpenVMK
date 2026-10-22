// 38365562899c7799eeaea4a99041ea57.cct / CStructStack / top

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function top(_me: LingoMe) {
  if ((lingoTruthy(callMethod("isEmpty", _me)) ? 0 : 1)) {
  return meProp(_me, "m_ar_data")[meProp(_me, "m_ar_data").count];
  }

  return undefined;
}

