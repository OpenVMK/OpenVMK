// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / randomizeColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function randomizeColor(_me: LingoMe) {
  setMeProp(_me, "m_rColor", callNamed("rgb", callNamed("random", 255), callNamed("random", 255), callNamed("random", 255)));
  setMeProp(_me, "m_bNeedUpdate", 1);
}

