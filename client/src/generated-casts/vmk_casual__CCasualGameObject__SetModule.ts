// vmk_casual.cct / CCasualGameObject / SetModule

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetModule(_me: LingoMe, _this: LingoValue, a_rModule: LingoValue) {
  setMeProp(_me, "m_rModule", a_rModule);
}

