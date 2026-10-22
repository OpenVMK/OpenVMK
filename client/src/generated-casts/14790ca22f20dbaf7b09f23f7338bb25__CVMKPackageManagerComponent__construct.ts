// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callNamed("registerMessage", symbol("load_package"), callMethod("getID", _this), symbol("LoadPackage"))
  callNamed("registerMessage", symbol("unload_package"), callMethod("getID", _this), symbol("UnloadPackage"))
  setMeProp(_me, "m_mp_sPack_mpData", new LingoPropList([]));
  return 1;
}

