// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / _ChangePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangePage(_me: LingoMe, _this: LingoValue, a_kPage: LingoValue) {
  setMeProp(_me, "m_kCurPageName", a_kPage);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  }

  var t_ar_kCategories = new LingoList([a_kPage]);
  switch (a_kPage) {
case symbol("credits"):
  var t_sCls = callNamed("GetClsVariable", "inv.class.credits");
  var t_sTab = "credits";
  break;
case symbol("items"):
  t_sCls = callNamed("GetClsVariable", "inv.class.items");
  t_sTab = "furniture";
  break;
case symbol("posters"):
  t_sCls = callNamed("GetClsVariable", "inv.class.posters");
  t_sTab = "posters";
  break;
case symbol("pins"):
  t_sCls = callNamed("GetClsVariable", "inv.class.pins");
  t_sTab = "pins";
  break;
case symbol("clothes"):
  t_sCls = callNamed("GetClsVariable", "inv.class.clothes");
  t_sTab = "clothes";
  break;
case symbol("code"):
  t_sCls = callNamed("GetClsVariable", "inv.class.code");
  t_sTab = "codes";
  break;
  // HAND-CORRECTED: the decompiler rendered the case's `otherwise:` branch —
  // error("Unknown inventory page!") — as an UNCONDITIONAL `return error(...)`
  // placed after `end case`, which made the entire page-build below dead code:
  // no tab shown, m_rCurPageObj never created, so the panel came up blank and
  // `open` then called `update` on the VOID m_rCurPageObj ("Lingo method call
  // on VOID: update"). The .lsasm shows the six cases each `jmp` past this to
  // the build chain at [0214], and the error is reached only by fall-through
  // when no page matched — and it does NOT return. Restored as the default
  // case; execution continues to build the page for every real tab.
  // ⚠ RE-APPLY AFTER ANY REGENERATION of client/src/generated-casts.
default:
  callNamed("error", _this, "Unknown inventory page!", symbol("_ChangePage"))
  break;
  }

  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.tab.credits.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.tab.furniture.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.tab.posters.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.tab.pins.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.tab.clothes.active"))
  callMethod("hide", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.tab.codes.active"))
  callMethod("show", callMethod("getElement", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "inv.tab.", t_sTab), ".active")))
  setMeProp(_me, "m_rCurPageObj", callNamed("createObject", callNamed("getUniqueID"), t_sCls));
  var t_ar_iCursors = new LingoPropList([]);
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("merge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callMethod("getRollOverCursors", _this, meProp(_me, "m_rCurPageObj").m_rWindow, t_ar_iCursors)
  callMethod("forceRollOverCursors", _this, meProp(_me, "m_rCurPageObj").m_rWindow, 4)
  if (lingoBinary("neq", a_kPage, symbol("credits"))) {
  for (var t_kCategory of t_ar_kCategories.toArray()) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), t_kCategory)
  }

  } else {
  callMethod("update", meProp(_me, "m_rCurPageObj"), callNamed("getThread", "inventory").component.m_iCredits, symbol("credits"))
  }

  callMethod("setRollOverCursors", _this, meProp(_me, "m_rCurPageObj").m_rWindow, t_ar_iCursors)
  } else {
  return callNamed("error", _this, "Failed to initialize inventory page!", symbol("_ChangePage"));
  }

  switch (meProp(_me, "m_kCurPageName")) {
case symbol("credits"):
  break;
case symbol("items"):
  break;
case symbol("posters"):
  break;
case symbol("pins"):
  break;
case symbol("clothes"):
  break;
case symbol("code"):
  callMethod("open", meProp(_me, "m_rCurPageObj"))
  break;
  }

  }

}

