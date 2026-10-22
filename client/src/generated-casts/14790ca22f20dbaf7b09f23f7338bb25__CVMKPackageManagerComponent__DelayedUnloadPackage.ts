// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / DelayedUnloadPackage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DelayedUnloadPackage(_me: LingoMe, _this: LingoValue, a_sPackageName: LingoValue, a_iDelayTime: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_sPack_mpData"), a_sPackageName))) ? 0 : 1)) {
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_mp_sPack_mpData")[a_sPackageName].state, symbol("unloading"))) ? 0 : 1)) {
  var t_sUnloadTimer = lingoBinary("join", "PackageUnload", callNamed("getUniqueID"));
  setThePropOf(meProp(_me, "m_mp_sPack_mpData")[a_sPackageName], "state", symbol("unloading"));
  setThePropOf(meProp(_me, "m_mp_sPack_mpData")[a_sPackageName], "timer", t_sUnloadTimer);
  callNamed("createTimeout", t_sUnloadTimer, a_iDelayTime, symbol("UnloadPackage"), callMethod("getID", _this), a_sPackageName, 1)
  } else {
  callNamed("put", lingoBinary("join", lingoBinary("join", "Package ", a_sPackageName), " already unloading!"))
  }

  } else {
  callNamed("put", lingoBinary("join", "Tried to unload package not in memory :", a_sPackageName))
  }

}

