// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_storemember", callNamed("member", "PhotoImage"));
  setMeProp(_me, "m_thumbmember", callNamed("member", "PhotoThumb"));
  setMeProp(_me, "m_photoid", -float(1));
  setMeProp(_me, "m_filmAmount", 0);
  setMeProp(_me, "m_lastphotorect", callNamed("rect", 0, 0, 0, 0));
  return 1;
}

