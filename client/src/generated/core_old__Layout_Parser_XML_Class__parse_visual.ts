// core.old.cct / Layout Parser XML Class / parse_visual

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parse_visual(_me: LingoMe, tFieldName: LingoValue) {
  var tdata = callNamed("member", callMethod("getmemnum", callNamed("getResourceManager"), tFieldName)).text;
  var tXML = callNamed("CreateXML", callNamed("member", callMethod("getmemnum", callNamed("getResourceManager"), tFieldName)).text);
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

  if (callMethod("Search", tXML, "TYPE", "elements", 1)) {
  tLayDefinition[symbol("elements")] = new LingoList([]);
  for (var t = 1; t <= callMethod("count", tXML); ++t) {
  var tElem = tXML[t];
  var tList = new LingoPropList([]);
  for (var p = 1; p <= tElem[symbol("param")].count; ++p) {
  callMethod("addProp", tList, callNamed("symbol", callMethod("getPropAt", tElem[symbol("param")], p)), tElem[symbol("param")][p])
  }

  callMethod("add", tLayDefinition[symbol("elements")], tList)
  }

  }

  if (callNamed("voidp", tLayDefinition[symbol("version")])) {
  callNamed("error", _me, lingoBinary("joinPad", "Old visualizer definition:", tFieldName), symbol("parse_room"))
  for (var tElem of tLayDefinition[symbol("elements")].toArray()) {
  if (lingoBinary("or", lingoBinary("eq", tElem[symbol("media")], symbol("field")), lingoBinary("eq", tElem[symbol("media")], symbol("text")))) {
  tElem[symbol("txtColor")] = tElem[symbol("color")];
  tElem[symbol("txtBgColor")] = tElem[symbol("bgColor")];
  tElem[symbol("color")] = "#000000";
  tElem[symbol("bgColor")] = "#FFFFFF";
  }

  callMethod("deleteProp", tElem, symbol("foreColor"))
  callMethod("deleteProp", tElem, symbol("backColor"))
  }

  }

  for (var tElem of tLayDefinition[symbol("elements")].toArray()) {
  if (callNamed("voidp", tElem[symbol("color")])) {
  tElem[symbol("color")] = "#000000";
  }

  if (callNamed("voidp", tElem[symbol("bgColor")])) {
  tElem[symbol("bgColor")] = "#FFFFFF";
  }

  if (lingoBinary("eq", tElem[symbol("type")], "button")) {
  tElem[symbol("Active")] = 1;
  }

  }

  return new LingoPropList([symbol("name"), tLayDefinition[symbol("name")], symbol("roomdata"), tLayDefinition[symbol("roomdata")], symbol("rect"), tLayDefinition[symbol("rect")], symbol("elements"), tLayDefinition[symbol("elements")]]);
}

