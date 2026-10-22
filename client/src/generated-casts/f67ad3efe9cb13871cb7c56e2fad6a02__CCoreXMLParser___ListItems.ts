// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLParser / _ListItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ListItems(_me: LingoMe, _this: LingoValue, a_sInput: LingoValue, a_ar_sOutput: LingoValue) {
  var t_sDoc = a_sInput;
  var t_sOpen = "<";
  var t_sClose = ">";
  var t_sComOpen = "<!--";
  var t_sComClose = "-->";
  while (1) {
  if (lingoBinary("starts", chunkOf(t_sDoc, "word", 1, 0), t_sOpen)) {
  var t_iOpen = callNamed("offset", t_sOpen, t_sDoc);
  if (lingoBinary("lt", t_iOpen, 1)) {
  break;
  }

  if (lingoBinary("eq", callNamed("chars", t_sDoc, t_iOpen, lingoBinary("add", t_iOpen, 3)), t_sComOpen)) {
  var t_iClose = callNamed("offset", t_sComClose, t_sDoc);
  var t_iCount = 1;
  while (1) {
  t_sDoc = callNamed("chars", t_sDoc, lingoBinary("add", t_iOpen, 4), callNamed("length", t_sDoc));
  t_iOpen = callNamed("offset", t_sComOpen, t_sDoc);
  if (lingoBinary("and", lingoBinary("gt", t_iOpen, 0), lingoBinary("lt", t_iOpen, t_iClose))) {
  t_iCount = lingoBinary("add", t_iCount, 1);
  continue;
  }

  break;
  }

  for (var i = 1; i <= t_iCount; ++i) {
  t_sDoc = callNamed("chars", t_sDoc, lingoBinary("add", callNamed("offset", t_sComClose, t_sDoc), 3), callNamed("length", t_sDoc));
  }

  continue;
  }

  t_iClose = callNamed("offset", t_sClose, t_sDoc);
  if (lingoBinary("lt", t_iClose, 1)) {
  break;
  }

  if (lingoBinary("eq", callNamed("chars", t_sDoc, lingoBinary("add", t_iOpen, 1), lingoBinary("add", t_iOpen, 1)), "!")) {
  switch (callNamed("chars", t_sDoc, lingoBinary("add", t_iOpen, 2), lingoBinary("add", t_iOpen, 8))) {
case "[CDATA[":
  t_iClose = lingoBinary("add", callNamed("offset", "]]>", t_sDoc), 2);
  break;
case "DOCTYPE":
  if (lingoBinary("starts", chunkOf(t_sDoc, "word", 3, 0), "[")) {
  t_iClose = lingoBinary("add", callNamed("offset", "]", t_sDoc), 1);
  }

  break;
  }

  }

  } else {
  t_iOpen = 1;
  t_iClose = lingoBinary("sub", callNamed("offset", t_sOpen, t_sDoc), 1);
  if (lingoBinary("lt", t_iClose, 1)) {
  break;
  }

  }

  var t_sItem = callNamed("chars", t_sDoc, t_iOpen, t_iClose);
  if ((lingoTruthy(lingoBinary("eq", callNamed("chars", t_sItem, 1, 9), "<![CDATA[")) ? 0 : 1)) {
  var t_iLines = chunkCount(t_sItem, "line");
  if (lingoBinary("gt", t_iLines, 1)) {
  var t_sTemp = "";
  for (var i = 1; i <= lingoBinary("sub", t_iLines, 1); ++i) {
  var t_sLine = chunkOf(t_sItem, "line", i, 0);
  t_sLine = chunkOf(t_sLine, "word", 1, chunkCount(t_sLine, "word"));
  t_sTemp = t_sTemp + lingoBinary("join", t_sLine, callNamed("space"));
  }

  t_sLine = chunkOf(t_sItem, "line", i, 0);
  t_sLine = chunkOf(t_sLine, "word", 1, chunkCount(t_sLine, "word"));
  t_sTemp = t_sTemp + t_sLine;
  t_sItem = t_sTemp;
  }

  }

  callMethod("append", a_ar_sOutput, t_sItem)
  t_sDoc = callNamed("chars", t_sDoc, lingoBinary("add", t_iClose, 1), callNamed("length", t_sDoc));
  }

  return 1;
}

