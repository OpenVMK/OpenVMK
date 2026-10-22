// d0e535313898676eb605277339b50f27.cct / CEmoticons / SetDanceButtonState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetDanceButtonState(_me: LingoMe, _this: LingoValue, a_bState: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(meProp(_me, "m_bDanceBtnState")) ? 0 : 1), a_bState)) {
  setMeProp(_me, "m_bDanceState", 0);
  }

  setMeProp(_me, "m_bDanceBtnState", a_bState);
}

