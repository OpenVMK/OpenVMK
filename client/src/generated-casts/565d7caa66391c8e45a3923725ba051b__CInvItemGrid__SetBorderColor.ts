// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / SetBorderColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetBorderColor(_me: LingoMe, _this: LingoValue, a_rColor: LingoValue) {
  setMeProp(_me, "m_rBorderCol", a_rColor);
}

