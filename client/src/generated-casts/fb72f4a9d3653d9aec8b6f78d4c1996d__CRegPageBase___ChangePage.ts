// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPageBase / _ChangePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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
  /*
   * ⚠ HAND-CORRECTED EMITTER BUG — this was Lingo's `otherwise:` branch.
   *
   * The source is a `case … of` whose otherwise clause errors out on an
   * unrecognised page:
   *
   *     case m_iCurrentPage of
   *       1: t_sCls = "CRegPage1"
   *       …
   *       otherwise: return error(me, "Unknown registration page!", #_ChangePage)
   *     end case
   *
   * The emitter placed that `return error(...)` AFTER the closing brace instead
   * of inside as `default:`, so it ran unconditionally on every call and made
   * the whole rest of the handler — hiding the step markers, showing the current
   * one, creating and merging the page object — unreachable.
   *
   * The symptom was one line in the log, "Unknown registration page!", on a
   * registration screen that had drawn its backdrop and STEP 1 2 3 markers and
   * then simply had no page on it. Same shape as the `CMgrWindow.create` fix.
   */
  default:
  return callNamed("error", _this, "Unknown registration page!", symbol("_ChangePage"));
  }

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

