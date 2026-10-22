// vmk_monorail_train_handler.cct / COscillatorLCD / GetFrameNum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetFrameNum(_me: LingoMe, a_iMilliseconds: LingoValue) {
  setMeProp(_me, "m_iCurFrame", lingoBinary("add", meProp(_me, "m_iCurFrame"), callNamed("random", 3)));
  if (lingoBinary("gt", meProp(_me, "m_iCurFrame"), 5)) {
  setMeProp(_me, "m_iCurFrame", lingoBinary("sub", meProp(_me, "m_iCurFrame"), 5));
  }

  return meProp(_me, "m_iCurFrame");
}

