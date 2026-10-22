// 38365562899c7799eeaea4a99041ea57.cct / CUIComponent / readDefinition

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
  setMeProp(_me, "m_ar_layouts", new LingoList([]));
  // ⚠ HAND-CORRECTED EMITTER BUG — was `tDoc.toArray()`. `tDoc` is a
  // CCoreXMLDoc script instance with no `toArray`; the loop wants the COMPONENT
  // node's children, which `Search(…, "COMPONENT", 1)` has just selected. See
  // the full note in the d1ee027a copy of this file.
  for (var t_ar_layOut of meProp(tDoc, "m_rRef").child.toArray()) {
  var t_rLayout = callNamed("createObject", lingoBinary("join", "ComponentLayout", callNamed("getUniqueID")), "CScale9Grid");
  callMethod("readDefinition", t_rLayout, t_ar_layOut[symbol("param")]["DESC"])
  callMethod("resize", t_rLayout, callNamed("value", t_ar_layOut[symbol("param")]["WIDTH"]), callNamed("value", t_ar_layOut[symbol("param")]["HEIGHT"]))
  callMethod("setEvent", t_rLayout, t_ar_layOut[symbol("param")]["EVENT"])
  callMethod("setPos", t_rLayout, callNamed("value", t_ar_layOut[symbol("param")]["X"]), callNamed("value", t_ar_layOut[symbol("param")]["Y"]))
  var t_sTxtKey = t_ar_layOut[symbol("param")]["TXTKEY"];
  var t_sFont = t_ar_layOut[symbol("param")]["FONT"];
  var t_iFontSize = callNamed("value", t_ar_layOut[symbol("param")]["TXTSIZE"]);
  var t_sTxtAlignH = t_ar_layOut[symbol("param")]["ALIGNH"];
  var t_sTxtAlignV = t_ar_layOut[symbol("param")]["ALIGNV"];
  var t_sIcon = t_ar_layOut[symbol("param")]["ICON"];
  var t_sIconAlign = t_ar_layOut[symbol("param")]["ICONALIGN"];
  var t_bAntiAlias = callNamed("value", t_ar_layOut[symbol("param")]["ANTIALIAS"]);
  if (!lingoTruthy(callNamed("voidp", t_sTxtKey))) {
  callMethod("setTextStruct", t_rLayout, callNamed("getText", t_sTxtKey), t_sFont, t_iFontSize, t_sTxtAlignH, t_sTxtAlignV, t_bAntiAlias)
  }

  callMethod("setIcon", t_rLayout, t_sIcon, t_sIconAlign)
  callMethod("append", meProp(_me, "m_ar_layouts"), t_rLayout)
  }

}

