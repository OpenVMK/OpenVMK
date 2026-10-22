// registration.cct / CRegPageBase / _ChangePage

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangePage(_me: LingoMe, _this: LingoValue, a_kPage: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  if (callMethod("DataGathered", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  } else {
  return 0;
  }

  }

  setMeProp(_me, "m_iCurrentPage", a_kPage);
  var t_ar_kCategories = new LingoList([a_kPage]);
  switch (meProp(_me, "m_iCurrentPage")) {
case 1:
  var t_sCls = "CRegPage1";
  break;
case 2:
  t_sCls = "CRegPage2";
  break;
case 3:
  t_sCls = "CRegPage3";
  break;
  }

  return callNamed("error", _this, "Unknown registration page!", symbol("_ChangePage"));
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.step1.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.step2.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.step3.active"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "reg.step", meProp(_me, "m_iCurrentPage")), ".active")))
  setMeProp(_me, "m_rCurPageObj", callNamed("createObject", callNamed("getUniqueID"), t_sCls));
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("merge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  for (var t_kCategory of t_ar_kCategories.toArray()) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), t_kCategory)
  }

  } else {
  return callNamed("error", _this, "Failed to initialize inventory page!", symbol("_ChangePage"));
  }

  }

}

