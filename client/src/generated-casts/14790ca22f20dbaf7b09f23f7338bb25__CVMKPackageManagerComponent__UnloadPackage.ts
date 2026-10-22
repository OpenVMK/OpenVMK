// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / UnloadPackage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnloadPackage(_me: LingoMe, _this: LingoValue, a_sPackageName: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_sPack_mpData"), a_sPackageName))) ? 0 : 1)) {
  for (var tCast of meProp(_me, "m_mp_sPack_mpData")[a_sPackageName][symbol("casts")].toArray()) {
  callNamed("RemoveCastLib", tCast)
  }

  callMethod("deleteProp", meProp(_me, "m_mp_sPack_mpData"), a_sPackageName)
  }

}

