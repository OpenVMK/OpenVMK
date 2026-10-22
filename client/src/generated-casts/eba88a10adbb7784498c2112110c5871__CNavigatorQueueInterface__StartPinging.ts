// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / StartPinging

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartPinging(_me: LingoMe) {
  if ((lingoTruthy(callNamed("timeoutExists", meProp(_me, "m_sPingTimeout"))) ? 0 : 1)) {
  callNamed("createTimeout", meProp(_me, "m_sPingTimeout"), 300000, symbol("_PingCallback"), callMethod("getID", _me), undefined, 0)
  }

}

