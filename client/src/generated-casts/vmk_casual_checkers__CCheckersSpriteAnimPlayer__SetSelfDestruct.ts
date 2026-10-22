// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / SetSelfDestruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSelfDestruct(_me: LingoMe, _this: LingoValue, a_bDestroy: LingoValue) {
  setMeProp(_me, "m_bDestroyWhenReady", lingoBinary("eq", a_bDestroy, 1));
}

