// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / CastLoadCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CastLoadCallback(_me: LingoMe, _this: LingoValue, a_mpParam: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_mp_sPack_mpData")[a_mpParam[symbol("package")]].Init, undefined)) {
  var t_sCastName = meProp(_me, "m_mp_sPack_mpData")[a_mpParam[symbol("package")]].Init;
  setThePropOf(meProp(_me, "m_mp_sPack_mpData")[a_mpParam[symbol("package")]], "Init", undefined);
  callNamed("RemoveCastLib", t_sCastName)
  callMethod("deleteOne", meProp(_me, "m_mp_sPack_mpData")[a_mpParam[symbol("package")]][symbol("casts")], t_sCastName)
  }

  callMethod("RemoveLoadingWindow", _this._interface)
  setThePropOf(meProp(_me, "m_mp_sPack_mpData")[a_mpParam[symbol("package")]], "state", symbol("loaded"));
}

