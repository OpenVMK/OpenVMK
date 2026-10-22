// 239fb1d2675fc448140198b03238814c.cct / CMainProcessManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iProcessIdSeed", 0);
  setMeProp(_me, "m_iCurrentProcess", 0);
  setMeProp(_me, "m_ar_rProcessQueue", new LingoList([]));
  return 1;
}

