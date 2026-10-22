// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / StopPinging

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopPinging(_me: LingoMe) {
  if (callNamed("timeoutExists", meProp(_me, "m_sPingTimeout"))) {
  callNamed("removeTimeout", meProp(_me, "m_sPingTimeout"))
  }

}

