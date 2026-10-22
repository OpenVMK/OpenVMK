// 239fb1d2675fc448140198b03238814c.cct / CMainProcessManager / ProcessReadyCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ProcessReadyCallback(_me: LingoMe, _this: LingoValue, a_iProcessNumber: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "PROCESS READY", a_iProcessNumber))
  if (lingoBinary("neq", a_iProcessNumber, meProp(_me, "m_iCurrentProcess"))) {
  callNamed("error", _this, "Process queue manager is out of sync!!!", symbol("ProcessReadyCallback"))
  }

  if (meProp(_me, "m_ar_rProcessQueue").count) {
  setMeProp(_me, "m_iCurrentProcess", meProp(_me, "m_ar_rProcessQueue")[1]);
  callMethod("deleteAt", meProp(_me, "m_ar_rProcessQueue"), 1)
  callNamed("put", lingoBinary("joinPad", "START PROCESS", meProp(_me, "m_iCurrentProcess")))
  callNamed("executeMessage", lingoBinary("join", "start_process_", meProp(_me, "m_iCurrentProcess")), meProp(_me, "m_iCurrentProcess"))
  } else {
  setMeProp(_me, "m_iCurrentProcess", 0);
  }

}

