// vmk_tutorial.cct / CJungleCruiseInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_sWindowTitle", "JungleCruiseWindow");
  setMeProp(_me, "m_bMouseIsDown", 0);
  return 1;
}

