// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / _CastLoadCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CastLoadCallback(_me: LingoMe, _this: LingoValue, a_iCloth: LingoValue) {
  var t_rType = callMethod("getaProp", meProp(_me, "m_mp_iCode_rProps"), a_iCloth);
  var t_ar_iItemsToPrepare = new LingoList([]);
  for (var t_sCast of t_rType.casts.toArray()) {
  var t_rCastProps = meProp(_me, "m_mp_sCast_rProps")[t_sCast];
  if (lingoBinary("neq", t_rCastProps.status, symbol("ready"))) {
  if (callNamed("castExists", t_sCast)) {
  var t_rCast = callNamed("castLib", t_sCast);
  } else {
  t_rCast = undefined;
  }

  if (lingoBinary("eq", callNamed("ilk", t_rCast), symbol("castLib"))) {
  var t_iCount = thePropOf(callNamed("castLib", t_sCast), "number of castMembers");
  for (var j = 1; j <= t_iCount; ++j) {
  var t_rMember = callNamed("member", j, t_rCast._number);
  if (lingoBinary("neq", t_rMember._type, symbol("empty"))) {
  var t_rImage = callMethod("duplicate", t_rMember.image);
  var t_rPoint = t_rMember.regPoint;
  var t_rAlpha = callMethod("extractAlpha", t_rImage);
  var t_rStruct = new LingoPropList([symbol("image"), t_rImage, symbol("point"), t_rPoint, symbol("alpha"), t_rAlpha]);
  meProp(_me, "m_mp_sName_rStruct")[t_rMember.name] = t_rStruct;
  }

  }

  callNamed("RemoveCastLib", t_sCast)
  }

  setThePropOf(t_rCastProps, "status", symbol("ready"));
  if (lingoBinary("gt", t_rCastProps.depencies.count, 1)) {
  for (var t_iType of t_rCastProps.depencies.toArray()) {
  if (callMethod("_CheckDepenciesForType", _this, t_iType)) {
  setThePropOf(callMethod("getaProp", meProp(_me, "m_mp_iCode_rProps"), t_iType), "status", symbol("ready"));
  callMethod("add", t_ar_iItemsToPrepare, t_iType)
  }

  }

  continue;
  }

  if (callMethod("_CheckDepenciesForType", _this, a_iCloth)) {
  setThePropOf(t_rType, "status", symbol("ready"));
  callMethod("add", t_ar_iItemsToPrepare, a_iCloth)
  }

  }

  }

  callMethod("_TellItemsToPrepare", _this, t_ar_iItemsToPrepare)
  while (lingoBinary("lt", meProp(_me, "m_ar_iLoading").count, meProp(_me, "m_iMaxLoading"))) {
  if (lingoBinary("gt", meProp(_me, "m_ar_iPending").count, 0)) {
  t_iType = meProp(_me, "m_ar_iPending")[1];
  callMethod("deleteAt", meProp(_me, "m_ar_iPending"), 1)
  callMethod("LoadCastLibsForCloth", _this, undefined, t_iType)
  continue;
  }

  break;
  }

}

