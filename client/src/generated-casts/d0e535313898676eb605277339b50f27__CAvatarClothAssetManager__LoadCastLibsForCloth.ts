// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / LoadCastLibsForCloth

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadCastLibsForCloth(_me: LingoMe, _this: LingoValue, a_rObject: LingoValue, a_iTypeCode: LingoValue) {
  var t_rProps = callMethod("getaProp", meProp(_me, "m_mp_iCode_rProps"), a_iTypeCode);
  if (lingoBinary("eq", t_rProps, undefined)) {
  t_rProps = new LingoPropList([symbol("status"), symbol("pending"), symbol("items"), new LingoList([a_rObject]), symbol("casts"), new LingoList([])]);
  callMethod("setaProp", meProp(_me, "m_mp_iCode_rProps"), a_iTypeCode, t_rProps)
  callMethod("addAt", meProp(_me, "m_ar_iPending"), 1, a_iTypeCode)
  if ((lingoTruthy(callNamed("voidp", a_rObject)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("getOne", t_rProps.items, a_rObject)) ? 0 : 1)) {
  callMethod("add", t_rProps.items, a_rObject)
  }

  }

  } else {
  if ((lingoTruthy(callNamed("voidp", a_rObject)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("getOne", t_rProps.items, a_rObject)) ? 0 : 1)) {
  callMethod("add", t_rProps.items, a_rObject)
  }

  }

  if (lingoBinary("eq", t_rProps.status, symbol("pending"))) {
  callMethod("deleteOne", meProp(_me, "m_ar_iPending"), a_iTypeCode)
  callMethod("addAt", meProp(_me, "m_ar_iPending"), 1, a_iTypeCode)
  } else {
  if (lingoBinary("eq", t_rProps.status, symbol("ready"))) {
  callMethod("_TellItemsToPrepare", _this, new LingoList([a_iTypeCode]))
  return 1;
  }

  }

  }

  if (lingoBinary("lt", meProp(_me, "m_ar_iLoading").count, meProp(_me, "m_iMaxLoading"))) {
  callMethod("deleteOne", meProp(_me, "m_ar_iPending"), a_iTypeCode)
  callMethod("append", meProp(_me, "m_ar_iLoading"), a_iTypeCode)
  setThePropOf(t_rProps, "status", symbol("LOADING"));
  } else {
  return 1;
  }

  var t_rStruct = callMethod("GetByTypeCode", meProp(_me, "m_rClothingMap"), a_iTypeCode);
  var t_ar_sCasts = t_rStruct.param["CASTS"];
  var t_sDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ",");
  for (var t_sCast of t_ar_sCasts.toArray()) {
  callMethod("add", t_rProps.casts, t_sCast)
  }

  setTheProperty("itemDelimiter", t_sDelim);
  var i = 1;
  while (1) {
  if (lingoBinary("gt", i, t_ar_sCasts.count)) {
  break;
  }

  t_sCast = t_ar_sCasts[i];
  if (lingoBinary("eq", meProp(_me, "m_mp_sCast_rProps")[t_sCast], undefined)) {
  meProp(_me, "m_mp_sCast_rProps")[t_sCast] = new LingoPropList([symbol("status"), symbol("LOADING"), symbol("depencies"), new LingoList([a_iTypeCode])]);
  i = lingoBinary("add", i, 1);
  continue;
  }

  if ((lingoTruthy(callMethod("getOne", meProp(_me, "m_mp_sCast_rProps")[t_sCast].depencies, a_iTypeCode)) ? 0 : 1)) {
  callMethod("add", meProp(_me, "m_mp_sCast_rProps")[t_sCast].depencies, a_iTypeCode)
  }

  callMethod("deleteAt", t_ar_sCasts, i)
  }

  if (t_ar_sCasts.count) {
  callNamed("registerCastloadCallback", callNamed("startCastLoad", t_ar_sCasts, 0, 1), symbol("_CastLoadCallback"), callMethod("getID", _this), a_iTypeCode)
  } else {
  if (callMethod("_CheckDepenciesForType", _this, a_iTypeCode)) {
  setThePropOf(callMethod("getaProp", meProp(_me, "m_mp_iCode_rProps"), a_iTypeCode), "status", symbol("ready"));
  callMethod("_TellItemsToPrepare", _this, new LingoList([a_iTypeCode]))
  }

  }

  return 1;
}

