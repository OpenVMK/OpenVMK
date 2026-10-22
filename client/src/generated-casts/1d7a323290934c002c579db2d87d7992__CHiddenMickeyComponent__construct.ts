// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_visible", 0);
  setMeProp(_me, "m_iFoundMickeys", 0);
  setMeProp(_me, "m_iTotalMickeys", 0);
}

