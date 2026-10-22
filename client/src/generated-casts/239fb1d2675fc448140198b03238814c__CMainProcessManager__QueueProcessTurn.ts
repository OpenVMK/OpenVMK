// 239fb1d2675fc448140198b03238814c.cct / CMainProcessManager / QueueProcessTurn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QueueProcessTurn(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iProcessIdSeed", lingoBinary("add", meProp(_me, "m_iProcessIdSeed"), 1));
  callMethod("add", meProp(_me, "m_ar_rProcessQueue"), meProp(_me, "m_iProcessIdSeed"))
  callNamed("put", lingoBinary("joinPad", "QUEUE PROCESS", meProp(_me, "m_iProcessIdSeed")))
  if (lingoBinary("eq", meProp(_me, "m_ar_rProcessQueue").count, 1)) {
  callMethod("delay", _this, 10, symbol("ProcessReadyCallback"), meProp(_me, "m_iCurrentProcess"))
  }

  return meProp(_me, "m_iProcessIdSeed");
}

