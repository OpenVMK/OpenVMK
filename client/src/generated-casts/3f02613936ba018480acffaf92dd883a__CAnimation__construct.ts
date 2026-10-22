// 3f02613936ba018480acffaf92dd883a.cct / CAnimation / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_framelist", new LingoList([]));
  setMeProp(_me, "m_ar_soundList", new LingoPropList([]));
  setMeProp(_me, "m_iLoopStart", 0);
  setMeProp(_me, "m_iLoopEnd", 0);
  setMeProp(_me, "m_iLoopCount", 0);
  setMeProp(_me, "m_bFreeze", 0);
  setMeProp(_me, "m_bStopped", 1);
  return 1;
}

