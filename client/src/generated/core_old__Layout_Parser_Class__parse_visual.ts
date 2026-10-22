// core.old.cct / Layout Parser Class / parse_visual

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
  var tSupportedTags = new LingoPropList([symbol("roomdata"), new LingoPropList([symbol("open"), "<roomdata>", symbol("close"), "</roomdata>"]), symbol("rect"), new LingoPropList([symbol("open"), "<rect>", symbol("close"), "</rect>"]), symbol("version"), new LingoPropList([symbol("open"), "<version>", symbol("close"), "</version>"]), symbol("elements"), new LingoPropList([symbol("open"), "<elements>", symbol("close"), "</elements>"])]);
  var tLayDefinition = new LingoPropList([]);
  var tOpenTagFlag = 0;
  var tTag = "";
  for (var x = 1; x <= tSupportedTags.count; ++x) {
  var tOpen = tSupportedTags[x].open;
  var tClose = tSupportedTags[x].close;
  tTag = callMethod("getPropAt", tSupportedTags, x);
  var tList = new LingoList([]);
  for (var i = 1; i <= tdata.line.count; ++i) {
  if (lingoBinary("eq", tdata.line[i].word[1], tOpen)) {
  for (var i = lingoBinary("add", i, 1); i <= tdata.line.count; ++i) {
  if (lingoBinary("eq", tdata.line[i].word[1], tClose)) {
  break;
  }

  if (!lingoTruthy(callNamed("voidp", callNamed("value", tdata.line[i])))) {
  callMethod("add", tList, callNamed("value", tdata.line[i]))
  }

  }

  }

  }

  if (lingoBinary("gt", tList.count, 0)) {
  tLayDefinition[tTag] = tList;
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

