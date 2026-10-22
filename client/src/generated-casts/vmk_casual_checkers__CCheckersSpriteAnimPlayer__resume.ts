// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / resume

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resume(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprite"))) ? 0 : 1)) {
  setMeProp(_me, "m_bPlaying", 1);
  }

}

