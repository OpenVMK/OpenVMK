// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindow"))
  }

  callMethod("hideLoadBar", _me)
  setMeProp(_me, "m_iPeopleInQueue", 0);
  return 1;
}

