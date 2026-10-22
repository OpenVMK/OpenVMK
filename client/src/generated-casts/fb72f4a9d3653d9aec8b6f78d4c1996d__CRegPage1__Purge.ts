// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / Purge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Purge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  setMeProp(_me, "m_rWindow", undefined);
  return callMethod("unmerge", a_rWindow);
  } else {
  return 1;
  }

}

