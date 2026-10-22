// core.old.cct / Layout Parser XML Class / parse_window

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parse_window(_me: LingoMe, tFieldName: LingoValue) {
  var tdata = callNamed("member", callMethod("getmemnum", callNamed("getResourceManager"), tFieldName)).text;
  var tXML = callNamed("CreateXML", callNamed("member", callMethod("getmemnum", callNamed("getResourceManager"), tFieldName)).text);
  var tNumberTypes = new LingoList([symbol("locH"), symbol("locV"), symbol("locZ"), symbol("ink"), symbol("blend"), symbol("width"), symbol("height"), symbol("wordWrap"), symbol("fontSize"), symbol("fixedLineSpace"), symbol("fontStyle")]);
  var tSymbolTypes = new LingoList([symbol("media"), symbol("type"), symbol("strech")]);
  var tLayDefinition = new LingoPropList([]);
  if (callMethod("Search", tXML, "TYPE", "version", 1)) {
  tLayDefinition[symbol("version")] = new LingoList([tXML[1][symbol("param")]["number"]]);
  }

  if (callMethod("Search", tXML, "TYPE", "rect", 1)) {
  tLayDefinition[symbol("rect")] = new LingoList([callNamed("value", tXML[1][symbol("param")]["string"])]);
  }

  if (callMethod("Search", tXML, "TYPE", "roomdata", 1)) {
  tLayDefinition[symbol("roomdata")] = new LingoList([tXML[1][symbol("param")]["string"]]);
  }

  if (callMethod("Search", tXML, "TYPE", "border", 1)) {
  tLayDefinition[symbol("border")] = new LingoList([callNamed("value", tXML[1][symbol("param")]["string"])]);
  }

  if (callMethod("Search", tXML, "TYPE", "clientrect", 1)) {
  tLayDefinition[symbol("clientrect")] = new LingoList([callNamed("value", tXML[1][symbol("param")]["string"])]);
  }

  if (callMethod("Search", tXML, "TYPE", "elements", 1)) {
  tLayDefinition[symbol("elements")] = new LingoList([]);
  for (var t = 1; t <= callMethod("count", tXML); ++t) {
  var tElem = tXML[t];
  var tList = new LingoPropList([]);
  for (var p = 1; p <= tElem[symbol("param")].count; ++p) {
  var tKey = callNamed("symbol", callMethod("getPropAt", tElem[symbol("param")], p));
  var tParam = tElem[symbol("param")][p];
  if (lingoBinary("neq", callMethod("getPos", tNumberTypes, tKey), 0)) {
  tParam = callNamed("value", tParam);
  } else {
  if (lingoBinary("neq", callMethod("getPos", tSymbolTypes, tKey), 0)) {
  tParam = callNamed("symbol", tParam);
  }

  }

  callMethod("addProp", tList, tKey, tParam)
  }

  callMethod("add", tLayDefinition[symbol("elements")], tList)
  }

  }

  var tElements = new LingoPropList([]);
  for (var tElem of tLayDefinition[symbol("elements")].toArray()) {
  if (callNamed("voidp", tElem[symbol("id")])) {
  var tSymbol = "null";
  } else {
  tSymbol = tElem.id;
  }

  if (callNamed("voidp", tElements[tSymbol])) {
  tElements[tSymbol] = new LingoList([]);
  }

  callMethod("add", tElements[tSymbol], tElem)
  }

  var tResMgr = callNamed("getResourceManager");
  for (var tElem of tLayDefinition[symbol("elements")].toArray()) {
  if (callNamed("stringp", tElem[symbol("txtColor")])) {
  tElem[symbol("txtColor")] = callNamed("rgb", tElem[symbol("txtColor")]);
  }

  if (callNamed("stringp", tElem[symbol("txtBgColor")])) {
  tElem[symbol("txtBgColor")] = callNamed("rgb", tElem[symbol("txtBgColor")]);
  }

  if (callNamed("voidp", tElem[symbol("color")])) {
  tElem[symbol("color")] = "#000000";
  }

  if (callNamed("voidp", tElem[symbol("bgColor")])) {
  tElem[symbol("bgColor")] = "#FFFFFF";
  }

  tElem[symbol("color")] = callNamed("rgb", tElem[symbol("color")]);
  tElem[symbol("bgColor")] = callNamed("rgb", tElem[symbol("bgColor")]);
  var tPalette = tElem[symbol("palette")];
  if (callNamed("stringp", tPalette)) {
  if (!lingoTruthy(callMethod("exists", tResMgr, lingoBinary("joinPad", tPalette, "Duplicate")))) {
  var tPalMemNum = callMethod("getmemnum", tResMgr, tPalette);
  if (lingoBinary("gt", tPalMemNum, 0)) {
  callMethod("duplicate", callNamed("member", tPalMemNum), callMethod("createMember", tResMgr, lingoBinary("joinPad", tPalette, "Duplicate"), symbol("palette")))
  } else {
  callMethod("createMember", tResMgr, lingoBinary("joinPad", tPalette, "Duplicate"), symbol("palette"))
  callNamed("error", _me, lingoBinary("joinPad", "Palette member missing:", tPalette), symbol("parse_window"))
  }

  }

  tElem[symbol("palette")] = lingoBinary("joinPad", tPalette, "Duplicate");
  }

  if (lingoBinary("eq", tElem[symbol("type")], "text")) {
  var tFontStruct = callNamed("getStructVariable", "struct.font.plain");
  if (callNamed("voidp", tElem[symbol("wordWrap")])) {
  tElem[symbol("wordWrap")] = 1;
  }

  if (callNamed("voidp", tElem[symbol("alignment")])) {
  tElem[symbol("alignment")] = symbol("left");
  }

  if (callNamed("voidp", tElem[symbol("font")])) {
  tElem[symbol("font")] = callMethod("getaProp", tFontStruct, symbol("font"));
  }

  if (callNamed("voidp", tElem[symbol("fontSize")])) {
  tElem[symbol("fontSize")] = callMethod("getaProp", tFontStruct, symbol("fontSize"));
  }

  if (callNamed("voidp", tElem[symbol("fontStyle")])) {
  tElem[symbol("fontStyle")] = callMethod("getaProp", tFontStruct, symbol("fontStyle"));
  }

  if (callNamed("voidp", tElem[symbol("txtColor")])) {
  tElem[symbol("txtColor")] = callMethod("getaProp", tFontStruct, symbol("color"));
  }

  if (callNamed("voidp", tElem[symbol("txtBgColor")])) {
  tElem[symbol("txtBgColor")] = callNamed("rgb", 255, 255, 255);
  }

  if (callNamed("voidp", tElem[symbol("fixedLineSpace")])) {
  tElem[symbol("fixedLineSpace")] = tElem[symbol("fontSize")];
  }

  }

  if (!lingoTruthy(callNamed("voidp", tElem[symbol("strech")]))) {
  tElem[symbol("scaleH")] = symbol("fixed");
  tElem[symbol("scaleV")] = symbol("fixed");
  switch (tElem[symbol("strech")]) {
case symbol("moveH"):
  tElem[symbol("scaleH")] = symbol("move");
  break;
case symbol("moveV"):
  tElem[symbol("scaleV")] = symbol("move");
  break;
case symbol("strechH"):
  tElem[symbol("scaleH")] = symbol("scale");
  break;
case symbol("strechV"):
  tElem[symbol("scaleV")] = symbol("scale");
  break;
case symbol("centerH"):
  tElem[symbol("scaleH")] = symbol("center");
  break;
case symbol("centerV"):
  tElem[symbol("scaleV")] = symbol("center");
  break;
case symbol("moveHV"):
  tElem[symbol("scaleH")] = symbol("move");
  tElem[symbol("scaleV")] = symbol("move");
  break;
case symbol("strechHV"):
  tElem[symbol("scaleH")] = symbol("scale");
  tElem[symbol("scaleV")] = symbol("scale");
  break;
case symbol("centerHV"):
  tElem[symbol("scaleH")] = symbol("center");
  tElem[symbol("scaleV")] = symbol("center");
  break;
case symbol("moveHstrechV"):
  tElem[symbol("scaleH")] = symbol("move");
  tElem[symbol("scaleV")] = symbol("scale");
  break;
case symbol("moveVstrechH"):
  tElem[symbol("scaleH")] = symbol("scale");
  tElem[symbol("scaleV")] = symbol("move");
  break;
case symbol("moveHcenterV"):
  tElem[symbol("scaleH")] = symbol("move");
  tElem[symbol("scaleV")] = symbol("center");
  break;
case symbol("moveVcenterH"):
  tElem[symbol("scaleH")] = symbol("center");
  tElem[symbol("scaleV")] = symbol("move");
  break;
  }

  callMethod("deleteProp", tElem, symbol("strech"))
  }

  }

  if (lingoBinary("eq", tLayDefinition[symbol("rect")].count, 0)) {
  var tRect = callNamed("rect", 10000, 10000, -float(10000), -float(10000));
  for (var tElement of tElements.toArray()) {
  for (var tItem of tElement.toArray()) {
  if (lingoBinary("lt", tItem.locH, tRect[1])) {
  tRect[1] = tItem.locH;
  }

  if (lingoBinary("lt", tItem.locV, tRect[2])) {
  tRect[2] = tItem.locV;
  }

  if (lingoBinary("gt", lingoBinary("add", tItem.locH, tItem.width), tRect[3])) {
  tRect[3] = lingoBinary("add", tItem.locH, tItem.width);
  }

  if (lingoBinary("gt", lingoBinary("add", tItem.locV, tItem.height), tRect[4])) {
  tRect[4] = lingoBinary("add", tItem.locV, tItem.height);
  }

  }

  }

  callMethod("add", tLayDefinition[symbol("rect")], tRect)
  for (var tElement of tElements.toArray()) {
  for (var tItem of tElement.toArray()) {
  setThePropOf(tItem, "locH", lingoBinary("sub", tItem.locH, tRect[1]));
  setThePropOf(tItem, "locV", lingoBinary("sub", tItem.locV, tRect[2]));
  }

  }

  } else {
  tList = tLayDefinition[symbol("rect")][1];
  tLayDefinition[symbol("rect")][1] = callNamed("rect", tList[1], tList[2], tList[3], tList[4]);
  }

  var tOffX = tLayDefinition[symbol("rect")][1][1];
  var tOffY = tLayDefinition[symbol("rect")][1][2];
  tLayDefinition[symbol("rect")][1] = lingoBinary("sub", tLayDefinition[symbol("rect")][1], new LingoList([tOffX, tOffY, tOffX, tOffY]));
  if (lingoBinary("eq", tLayDefinition[symbol("border")].count, 0)) {
  if (lingoBinary("gt", tLayDefinition[symbol("clientrect")].count, 0)) {
  var tClientRect = tLayDefinition[symbol("clientrect")][1];
  var tWinWidth = tLayDefinition[symbol("rect")][1][3];
  var tWinHeight = tLayDefinition[symbol("rect")][1][4];
  var tBorder = new LingoList([tClientRect[1], tClientRect[2], lingoBinary("sub", tWinWidth, tClientRect[3]), lingoBinary("sub", tWinHeight, tClientRect[4])]);
  callMethod("add", tLayDefinition[symbol("border")], tBorder)
  } else {
  callMethod("add", tLayDefinition[symbol("border")], new LingoList([0, 0, 0, 0]))
  }

  }

  tLayDefinition[symbol("elements")] = tElements;
  return tLayDefinition;
}

