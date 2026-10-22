// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLParser / ParseDTD

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseDTD(_me: LingoMe, _this: LingoValue, a_sDTD: LingoValue, a_sDoc: LingoValue) {
  var t_mp_sElem_vData = callMethod("getaProp", meProp(_me, "m_mp_sDTD_rDoc"), a_sDTD);
  if ((lingoTruthy(callNamed("voidp", t_mp_sElem_vData)) ? 0 : 1)) {
  return t_mp_sElem_vData;
  }

  t_mp_sElem_vData = new LingoPropList([]);
  var t_ar_sTag = new LingoList([]);
  if ((lingoTruthy(callMethod("_ListItems", _this, a_sDoc, t_ar_sTag)) ? 0 : 1)) {
  callNamed("Throw", "Invalid document string")
  return t_mp_sElem_vData;
  }

  for (var t_sTag of t_ar_sTag.toArray()) {
  t_sTag = callNamed("chars", t_sTag, 2, lingoBinary("sub", callNamed("length", t_sTag), 1));
  var t_sCase = chunkOf(t_sTag, "word", 1, 0);
  var t_sData = callNamed("chars", t_sTag, 9, callNamed("length", t_sTag));
  var t_sElem = chunkOf(t_sData, "word", 1, 0);
  t_sData = chunkOf(t_sData, "word", 2, chunkCount(t_sData, "word"));
  switch (t_sCase) {
case "!ELEMENT":
  var t_mp_kKey_vData = new LingoPropList([symbol("data"), "", symbol("elements"), new LingoPropList([]), symbol("attributes"), new LingoPropList([])]);
  if (callNamed("voidp", callMethod("getaProp", t_mp_sElem_vData, t_sElem))) {
  callMethod("setaProp", t_mp_sElem_vData, t_sElem, t_mp_kKey_vData)
  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Multiple definitions of a single element:", t_sElem), symbol("ParseDTD"))
  continue;
  }

  if ((lingoTruthy(callMethod("_DTD_ParseContents", _this, t_sData, t_mp_kKey_vData.elements)) ? 0 : 1)) {
  callNamed("error", _this, lingoBinary("joinPad", "Invalid element data:", t_sElem), symbol("ParseDTD"))
  }

  break;
case "!ATTLIST":
  t_mp_kKey_vData = callMethod("getaProp", t_mp_sElem_vData, t_sElem);
  if (callNamed("voidp", t_mp_kKey_vData)) {
  callNamed("error", _this, lingoBinary("joinPad", "Attributes for undefined element:", t_sElem), symbol("ParseDTD"))
  continue;
  }

  if ((lingoTruthy(callMethod("_DTD_ParseAttributes", _this, t_sData, t_mp_kKey_vData.attributes)) ? 0 : 1)) {
  callNamed("error", _this, lingoBinary("joinPad", "Invalid attribute data:", t_sElem), symbol("ParseDTD"))
  }

  break;
  }

  continue;
  }

  callMethod("setaProp", meProp(_me, "m_mp_sDTD_rDoc"), a_sDTD, t_mp_sElem_vData)
  return t_mp_sElem_vData;
}

