// item_2355.cct / CCheckersSpriteAnimPlayer / SetFrameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFrameList(_me: LingoMe, _this: LingoValue, a_ar_rFrames: LingoValue) {
  setMeProp(_me, "m_ar_rFrames", a_ar_rFrames);
}

