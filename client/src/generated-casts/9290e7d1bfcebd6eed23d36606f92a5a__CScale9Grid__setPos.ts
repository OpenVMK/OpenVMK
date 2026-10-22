// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CScale9Grid / setPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPos(_me: LingoMe, t_iX: LingoValue, t_iY: LingoValue) {
  setMeProp(_me, "m_pPos", callNamed("point", t_iX, t_iY));
  setMeProp(_me, "m_bNeedUpdate", 1);
}

