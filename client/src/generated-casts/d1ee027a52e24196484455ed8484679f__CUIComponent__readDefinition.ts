// d1ee027a52e24196484455ed8484679f.cct / CUIComponent / readDefinition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function readDefinition(_me: LingoMe, i_sDef: LingoValue) {
  var m_sDefinition = i_sDef;
  var tDoc = callNamed("CreateXML", callNamed("getMember", i_sDef).text);
  callMethod("Search", tDoc, "TYPE", "COMPONENT", 1)
  setMeProp(_me, "m_iWidth", callNamed("value", callMethod("GetParam", tDoc, "WIDTH")));
  setMeProp(_me, "m_iHeight", callNamed("value", callMethod("GetParam", tDoc, "HEIGHT")));
  var t_sBgColor = callMethod("GetParam", tDoc, "BGCOLOR");
  if (!lingoTruthy(lingoBinary("eq", t_sBgColor, ""))) {
  setMeProp(_me, "m_rBgColor", callNamed("rgb", t_sBgColor));
  }

  var t_sActiveColor = callMethod("GetParam", tDoc, "ACTIVE");
  if (!lingoTruthy(lingoBinary("eq", t_sActiveColor, ""))) {
  setMeProp(_me, "m_rActiveColor", callNamed("rgb", t_sActiveColor));
  }

  var t_sBackground = callMethod("GetParam", tDoc, "BACKGROUND");
  if (!lingoTruthy(lingoBinary("eq", t_sBackground, ""))) {
  var t_rBgMbr = callNamed("member", t_sBackground);
  switch (t_rBgMbr._type) {
case symbol("empty"):
  break;
case symbol("field"):
  setMeProp(_me, "m_rBackground", callNamed("createObject", symbol("random"), "CScale9Grid"));
  callMethod("readDefinition", meProp(_me, "m_rBackground"), t_sBackground)
  callMethod("resize", meProp(_me, "m_rBackground"), meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"))
  callMethod("setTextStruct", meProp(_me, "m_rBackground"), "", "", "", "", "", "")
  callMethod("setIcon", meProp(_me, "m_rBackground"), "", "")
  break;
case symbol("bitmap"):
  setMeProp(_me, "m_rBackground", callMethod("duplicate", meProp(_me, "m_rBackground").image));
  break;
  }

  }

  var t_iOffsetX = callNamed("value", callMethod("GetParam", tDoc, "OFFSETX"));
  var t_iOffsetY = callNamed("value", callMethod("GetParam", tDoc, "OFFSETY"));
  setMeProp(_me, "m_pOffset", callNamed("point", t_iOffsetX, t_iOffsetY));
  setMeProp(_me, "m_iPad", callNamed("value", callMethod("GetParam", tDoc, "PAD")));
  /*
   * ⚠ AN ABSENT `CLICKABLE` MUST NOT CLOBBER `construct`'s DEFAULT OF 1.
   *
   * The original reads `m_bClickable = value(tDoc.GetParam("CLICKABLE"))`
   * unconditionally, and `GetParam` returns EMPTY for a key the XML does not
   * carry (CCoreXMLDoc.GetParam: `if voidp(t_sValue) then return EMPTY`), so
   * `value(EMPTY)` is VOID and every component ends up NOT clickable.
   *
   * That cannot be the intent. `construct` sets `m_bClickable = 1`, and of the
   * 32 `component.*.xml` members in the game exactly ONE mentions CLICKABLE —
   * `component.navigator.roomlist.title.xml`, as CLICKABLE="FALSE", to switch a
   * title row OFF. The attribute is an opt-OUT; omitting it means clickable.
   *
   * ⚠ THIS IS WHAT MADE THE REGISTRATION NAME ROWS DEAD. `CUIComponentPage`
   * gates hit-testing on it — `if t_rComponent.getClickable() then` before it
   * ever calls `getRect()` — so the clicks were being dropped one level above
   * the geometry, which all measured correct (`inside(point(50,10),
   * rect(0,0,135,19))` = 1). `component.registration.xml` omits CLICKABLE, and
   * `_PopulateNameList` never calls `setClickable`, unlike the catalog views
   * (`setClickable(t_rComponent, 1)`) which had been papering over this.
   *
   * Guarded the same way as BGCOLOR, ACTIVE and BACKGROUND above, which all
   * test the param against EMPTY before assigning. An explicit CLICKABLE still
   * wins, in both directions.
   */
  var t_sClickable = callMethod("GetParam", tDoc, "CLICKABLE");
  if (!lingoTruthy(lingoBinary("eq", t_sClickable, ""))) {
  setMeProp(_me, "m_bClickable", callNamed("value", t_sClickable));
  }

  setMeProp(_me, "m_ar_layouts", new LingoList([]));
  var t_iLayoutPos = callNamed("point", 0, 0);
  /*
   * ⚠ HAND-CORRECTED EMITTER BUG — was `tDoc.toArray()`.
   *
   * `tDoc` is a CCoreXMLDoc SCRIPT INSTANCE (see `CCoreThreadXML.CreateXML`,
   * which returns `rawNew(m_rXMLObjSrc.script)`). It has no `toArray`, so this
   * threw "tDoc.toArray is not a function" and took the whole component with it.
   *
   * The loop body reads `t_ar_layOut[#param]["DESC"]`, so it wants NODES — and
   * `Search(tDoc, "TYPE", "COMPONENT", 1)` on the line above has just parked
   * `m_rRef` on the COMPONENT node. So the iterable is that node's children.
   * Verified live:
   *
   *     doc.toArray          undefined
   *     doc.m_rRef.child     LingoPropList count=1, has toArray
   *
   * The emitter appears to drop the property chain when rendering
   * `repeat with X in <expr>` as `for (X of <expr>.toArray())`. The same line is
   * wrong in all three casts that carry CUIComponent (d1ee027a, 9290e7d1,
   * 38365562), which is consistent with one source compiled three times.
   *
   * ⚠ This is what left `reg.namelist` empty on registration page 1 — the five
   * generated names ARRIVE (BraveComet708, CaptainStar425, …) and are sitting in
   * `m_mp_kType_mp_iRef_rItem`; `_PopulateNameList` just died before drawing.
   */
  for (var t_ar_layOut of meProp(tDoc, "m_rRef").child.toArray()) {
  t_iLayoutPos = callNamed("point", 0, 0);
  var t_rLayout = callNamed("createObject", symbol("random"), "CScale9Grid");
  callMethod("readDefinition", t_rLayout, t_ar_layOut[symbol("param")]["DESC"])
  callMethod("resize", t_rLayout, callNamed("value", t_ar_layOut[symbol("param")]["WIDTH"]), callNamed("value", t_ar_layOut[symbol("param")]["HEIGHT"]))
  callMethod("setEvent", t_rLayout, t_ar_layOut[symbol("param")]["EVENT"])
  t_iLayoutPos = lingoBinary("add", t_iLayoutPos, callNamed("point", callNamed("value", t_ar_layOut[symbol("param")]["X"]), callNamed("value", t_ar_layOut[symbol("param")]["Y"])));
  callMethod("setPos", t_rLayout, t_iLayoutPos.locH, t_iLayoutPos.locV)
  var t_sTxtKey = t_ar_layOut[symbol("param")]["TXTKEY"];
  var t_sFont = t_ar_layOut[symbol("param")]["FONT"];
  var t_iFontSize = callNamed("value", t_ar_layOut[symbol("param")]["TXTSIZE"]);
  var t_sTxtAlignH = t_ar_layOut[symbol("param")]["ALIGNH"];
  var t_sTxtAlignV = t_ar_layOut[symbol("param")]["ALIGNV"];
  var t_sIcon = t_ar_layOut[symbol("param")]["ICON"];
  var t_sIconAlign = t_ar_layOut[symbol("param")]["ICONALIGN"];
  var t_bAntiAlias = callNamed("value", t_ar_layOut[symbol("param")]["ANTIALIAS"]);
  var t_bClickable = callNamed("value", t_ar_layOut[symbol("param")]["CLICKABLE"]);
  var t_bSearchable = callNamed("value", t_ar_layOut[symbol("param")]["SEARCHABLE"]);
  var t_sBlinker = t_ar_layOut[symbol("param")]["BLINKER"];
  if (!lingoTruthy(callNamed("voidp", t_sTxtKey))) {
  callMethod("setTextStruct", t_rLayout, callNamed("getText", t_sTxtKey), t_sFont, t_iFontSize, t_sTxtAlignH, t_sTxtAlignV, t_bAntiAlias)
  }

  callMethod("setIcon", t_rLayout, t_sIcon, t_sIconAlign)
  // Same opt-out rule for the LAYOUT's own flag — see the note on the
  // component's CLICKABLE above. `CScale9Grid.construct` also defaults to 1.
  if (!lingoTruthy(callNamed("voidp", t_ar_layOut[symbol("param")]["CLICKABLE"]))
      && !lingoTruthy(lingoBinary("eq", t_ar_layOut[symbol("param")]["CLICKABLE"], ""))) {
  callMethod("setClickable", t_rLayout, t_bClickable)
  }

  callMethod("setSearchable", t_rLayout, t_bSearchable)
  callMethod("setBlinker", t_rLayout, t_sBlinker)
  callMethod("setParentComponent", t_rLayout, _me)
  callMethod("append", meProp(_me, "m_ar_layouts"), t_rLayout)
  }

  callMethod("close", tDoc)
  tDoc = undefined;
}

