// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / int2time

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function int2time(_me: LingoMe, a_iInteger: LingoValue) {
  return new LingoPropList([symbol("m"), lingoBinary("div", a_iInteger, 60), symbol("s"), lingoBinary("mod", a_iInteger, 60)]);
}

