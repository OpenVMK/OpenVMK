// vmk_cambodian_handler.cct / CSpline3D / SetCatmullRomInterpolation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetCatmullRomInterpolation(_me: LingoMe) {
  setMeProp(_me, "m_iMode", symbol("CatmullRom"));
}

