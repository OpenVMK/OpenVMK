// fireworks_engine.cct / SoftBuffer Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pImage", undefined);
  setMeProp(_me, "m_pClearImage", undefined);
  setMeProp(_me, "m_size", callNamed("point", 0, 0));
  setMeProp(_me, "m_clearType", symbol("fill"));
  setMeProp(_me, "m_clearColor", callNamed("color", 0, 0, 0));
  setMeProp(_me, "m_clearParams", undefined);
}

