// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / LoadPackage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadPackage(_me: LingoMe, _this: LingoValue, a_sPackageName: LingoValue) {
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_sPack_mpData"), a_sPackageName))) {
  var t_mpCastList = new LingoPropList([]);
  if (callMethod("ParsePackage", _this, a_sPackageName, t_mpCastList)) {
  callMethod("setaProp", meProp(_me, "m_mp_sPack_mpData"), a_sPackageName, new LingoPropList([symbol("casts"), t_mpCastList[symbol("casts")], symbol("Init"), t_mpCastList[symbol("Init")], symbol("state"), symbol("LOADING"), symbol("timer"), undefined]))
  var tLoadID = callNamed("startCastLoad", t_mpCastList[symbol("casts")], 0, 1);
  callMethod("ShowLoadingWindow", _this._interface)
  var t_param = new LingoPropList([symbol("loadId"), tLoadID, symbol("package"), a_sPackageName]);
  return callNamed("registerCastloadCallback", tLoadID, symbol("CastLoadCallback"), callMethod("getID", _this), t_param);
  } else {
  return callNamed("error", _this, lingoBinary("join", "Package was undefined : ", a_sPackageName), symbol("LoadPackage"));
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_mp_sPack_mpData")[a_sPackageName].state, symbol("unloading"))) {
  callNamed("removeTimeout", meProp(_me, "m_mp_sPack_mpData")[a_sPackageName].timer)
  setThePropOf(meProp(_me, "m_mp_sPack_mpData")[a_sPackageName], "state", symbol("loaded"));
  return;
  }

  }

}

