// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindow", lingoBinary("join", callMethod("getID", _me), ".window"));
  setMeProp(_me, "m_fPercent", 0);
  setMeProp(_me, "m_iPeopleInQueue", 0);
  setMeProp(_me, "m_sPingTimeout", "QueuePing");
  return 1;
}

