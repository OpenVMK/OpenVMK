// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / IsPackageLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsPackageLoaded(_me: LingoMe, _this: LingoValue, a_sPackageName: LingoValue) {
  return lingoBinary("eq", meProp(_me, "m_mp_sPack_mpData")[a_sPackageName].state, symbol("loaded"));
}

