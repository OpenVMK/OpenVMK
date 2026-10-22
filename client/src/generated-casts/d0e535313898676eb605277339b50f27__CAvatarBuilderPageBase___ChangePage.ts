// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPageBase / _ChangePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangePage(_me: LingoMe, _this: LingoValue, a_kPage: LingoValue) {
  setMeProp(_me, "m_iCurrentPage", a_kPage);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  }

  var t_ar_kCategories = new LingoList([a_kPage]);
  switch (a_kPage) {
case symbol("avatar"):
  var t_sCls = "CAvatarBuilderPage";
  var t_sTab = "avatar";
  break;
  // HAND-CORRECTED: decompiler turned the case's `otherwise:` error into an
  // UNCONDITIONAL `return error(...)` before the page-build, leaving the
  // Character panel blank (see CInvPageBase._ChangePage for full analysis).
  // Restored as the default case; execution continues.
  // ⚠ RE-APPLY AFTER ANY REGENERATION of client/src/generated-casts.
default:
  callNamed("error", _this, "Unknown Catalog page!", symbol("_ChangePage"))
  break;
  }

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

