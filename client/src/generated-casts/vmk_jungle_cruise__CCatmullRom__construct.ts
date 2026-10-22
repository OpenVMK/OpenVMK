// vmk_jungle_cruise.cct / CCatmullRom / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "steps", 2);
  setMeProp(_me, "pts", new LingoList([]));
  setMeProp(_me, "m_ar_polygon", new LingoList([]));
  return 1;
}

