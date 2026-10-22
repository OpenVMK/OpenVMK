// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / getRect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRect(_me: LingoMe) {
  return callNamed("rect", meProp(_me, "m_pPos"), lingoBinary("add", meProp(_me, "m_pPos"), callNamed("point", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"))));
}

