// vmk_monorail_train_handler.cct / COscillatorLCD / SetFps

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetFps(_me: LingoMe, a_iFps: LingoValue) {
  setMeProp(_me, "m_iMaxDelay", lingoBinary("div", 30, callNamed("integer", a_iFps)));
  if (lingoBinary("lt", meProp(_me, "m_iMaxDelay"), 1)) {
  setMeProp(_me, "m_iMaxDelay", 1);
  }

}

