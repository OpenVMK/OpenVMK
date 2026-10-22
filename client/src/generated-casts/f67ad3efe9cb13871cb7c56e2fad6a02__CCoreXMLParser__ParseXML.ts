// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLParser / ParseXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseXML(_me: LingoMe, _this: LingoValue, a_sXML: LingoValue, a_sDoc: LingoValue) {
  var t_sCurDTD = "";
  var t_rRoot = new LingoPropList([symbol("type"), "xml", symbol("value"), "", symbol("param"), new LingoPropList([]), symbol("child"), new LingoPropList([])]);
  var t_rNode = t_rRoot;
  var t_ar_sItem = new LingoList([]);
  var t_bBool = callMethod("_ListItems", _this, a_sDoc, t_ar_sItem);
  if (lingoBinary("or", (lingoTruthy(t_bBool) ? 0 : 1), lingoBinary("eq", t_ar_sItem.count, 0))) {
  callNamed("Throw", "Invalid document string")
  return t_rRoot;
  }

  var t_sOpen = "<";
  var t_sClose = ">";
  var t_ar_rStack = new LingoList([]);
  var t_iItem = 1;
  while (1) {
  var t_sItem = t_ar_sItem[t_iItem];
  if (lingoBinary("starts", t_sItem, t_sOpen)) {
  t_sItem = callNamed("chars", t_sItem, 2, lingoBinary("sub", callNamed("length", t_sItem), 1));
  if (lingoBinary("eq", callNamed("chars", t_sItem, 1, 8), "![CDATA[")) {
  var t_sTag = "!CDATA";
  t_sItem = callNamed("chars", t_sItem, 9, lingoBinary("sub", callNamed("length", t_sItem), 2));
  } else {
  t_sTag = chunkOf(t_sItem, "word", 1, 0);
  t_sItem = deleteStringChunk(t_sItem, "word", 1, 0);
  }

  switch (chunkOf(t_sTag, "char", 1, 0)) {
case "/":
  var t_sEnd = callNamed("chars", t_sTag, 2, callNamed("length", t_sTag));
  if (lingoBinary("neq", t_sEnd, t_rNode._type)) {
  var t_sErr = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "<", t_rNode._type), "> --> </"), t_sEnd), ">");
  callNamed("error", _this, lingoBinary("joinPad", "Wrong or missing closing tag:", t_sErr), symbol("ParseXML"))
  }

  callMethod("deleteAt", t_ar_rStack, callNamed("count", t_ar_rStack))
  t_rNode = callMethod("getLast", t_ar_rStack);
  break;
case "?":
  callMethod("_XML_ParseAttributes", _this, t_sItem, t_rNode.param)
  break;
case "!":
  if (lingoBinary("eq", t_sTag, "!DOCTYPE")) {
  var t_sDTD = chunkOf(t_sItem, "word", 1, 0);
  var t_sVisibility = chunkOf(t_sItem, "word", 2, 0);
  if (lingoBinary("eq", t_sVisibility, "SYSTEM")) {
  var t_sFile = chunkOf(t_sItem, "word", 3, 0);
  var t_sDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "\"");
  t_sFile = chunkOf(t_sFile, "item", 2, 0);
  setTheProperty("itemDelimiter", t_sDelim);
  var t_rRes = callNamed("getMember", t_sFile);
  if (lingoBinary("gt", t_rRes._number, 0)) {
  var t_sText = t_rRes.text;
  } else {
  callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Declared DTD not found:", "\""), t_sFile), "\""), symbol("ParseXML"))
  t_sText = "";
  }

  } else {
  if (lingoBinary("eq", t_sVisibility, "PUBLIC")) {
  callNamed("error", _this, "No support for public DTD's!", symbol("ParseXML"))
  t_sText = "";
  } else {
  var t_iInline = callNamed("offset", "[", t_sItem);
  if (lingoBinary("gt", t_iInline, 0)) {
  t_sText = callNamed("chars", t_sItem, lingoBinary("add", t_iInline, 1), lingoBinary("sub", callNamed("offset", "]", t_sItem), 1));
  } else {
  t_sText = "";
  }

  }

  }

  callNamed("try")
  var t_rDTD = callMethod("ParseDTD", _this, t_sDTD, t_sText);
  if (callNamed("catch", "Invalid document string")) {
  t_rDTD = undefined;
  } else {
  t_sCurDTD = t_sDTD;
  }

  } else {
  if (lingoBinary("eq", t_sTag, "!CDATA")) {
  setThePropOf(callMethod("getLast", t_ar_rStack), "value", t_sItem);
  } else {
  callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Invalid marking:", "\""), t_sItem), "\""), symbol("ParseXML"))
  }

  }

  break;
  default:
  var t_rTemp = new LingoPropList([symbol("type"), t_sTag, symbol("value"), "", symbol("param"), new LingoPropList([]), symbol("child"), new LingoPropList([])]);
  callMethod("_XML_ParseAttributes", _this, t_sItem, t_rTemp.param)
  var t_sID = callMethod("getaProp", t_rTemp.param, "ID");
  if (callNamed("voidp", t_sID)) {
  t_sID = "";
  }

  callMethod("addProp", t_rNode.child, t_sID, t_rTemp)
  if (lingoBinary("eq", lastChunk(t_sItem, "char"), "/")) {
  } else {
  callMethod("append", t_ar_rStack, t_rTemp)
  t_rNode = t_rTemp;
  }

  }

  } else {
  setThePropOf(t_rNode, "value", t_sItem);
  }

  t_iItem = lingoBinary("add", t_iItem, 1);
  if (lingoBinary("gt", t_iItem, t_ar_sItem.count)) {
  break;
  }

  }

  if (meProp(_me, "m_bValidate")) {
  if (lingoBinary("neq", t_sCurDTD, "")) {
  t_rDTD = callMethod("getaProp", meProp(_me, "m_mp_sDTD_rDoc"), t_sCurDTD);
  if (callNamed("voidp", t_rDTD)) {
  callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Missing DOCTYPE definition:", "\""), t_sCurDTD), "\""), symbol("ParseXML"))
  }

  if ((lingoTruthy(callMethod("_XML_ValidateNode", _this, t_rDTD, t_rRoot.child[1])) ? 0 : 1)) {
  callNamed("error", _this, "Missing or invalid attributes!", symbol("ParseXML"))
  }

  }

  }

  callMethod("setaProp", meProp(_me, "m_mp_sXML_rDoc"), a_sXML, t_rRoot)
  return t_rRoot;
}

