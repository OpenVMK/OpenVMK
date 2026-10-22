// 38365562899c7799eeaea4a99041ea57.cct / CStructStack / push

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function push(_me: LingoMe, t_rdata: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_data"), t_rdata)
}

