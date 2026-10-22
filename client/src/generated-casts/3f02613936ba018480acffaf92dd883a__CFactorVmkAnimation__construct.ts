// 3f02613936ba018480acffaf92dd883a.cct / CFactorVmkAnimation / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_rSounds", new LingoPropList([]));
  setMeProp(_me, "m_ar_rEvents", new LingoPropList([]));
  return 1;
}

