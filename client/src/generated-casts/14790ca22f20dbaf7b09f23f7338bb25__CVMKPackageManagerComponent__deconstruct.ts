// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", symbol("load_package"))
  callNamed("unregisterMessage", symbol("unload_package"))
  setMeProp(_me, "m_mp_sPack_mpData", new LingoPropList([]));
  return 1;
}

