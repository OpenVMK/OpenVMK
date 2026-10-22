// vmk_fireworks_stages.cct / ExportStages / FWparseWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FWparseWindow(_me: LingoMe, t_ar_windowDescriptions: LingoValue) {
  var t_ar_buttons = new LingoList([]);
  var t_ar_texts = new LingoList([]);
  var t_ar_fields = new LingoList([]);
  var t_ar_Images = new LingoList([]);
  var t_sID = callNamed("getUniqueID");
  var t_bSuccess = callNamed("createWindow", t_sID, undefined, 0, 0, symbol("modal"));
  var t_rWindow = callNamed("getWindow", t_sID);
  for (var t_sWinDesc of t_ar_windowDescriptions.toArray()) {
  t_bSuccess = callMethod("merge", t_rWindow, t_sWinDesc);
  }

  callMethod("center", t_rWindow)
  for (var i = 1; i <= t_rWindow.pElemList.count; ++i) {
  var t_sElemName = callMethod("getPropAt", t_rWindow.pElemList, i);
  var t_rElem = callMethod("getElement", t_rWindow, t_sElemName);
  if (callNamed("objectp", t_rElem)) {
  var t_sElemType = t_rElem._string.word[2];
  t_sElemType = callNamed("replaceChunks", t_sElemType, "\"", "");
  switch (t_sElemType) {
case "CWindowCommonButton":
  callMethod("append", t_ar_buttons, t_sElemName)
  break;
case "CWindowTextWrapper":
  callMethod("append", t_ar_texts, t_sElemName)
  break;
case "CWindowFieldWrapper":
  callMethod("append", t_ar_fields, t_sElemName)
  break;
case "CWindowImageWrapper":
  callMethod("append", t_ar_Images, t_sElemName)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Unused elem-type", t_sElemType), t_sElemName))
  callNamed("nothing")
  }

  }

  }

  callMethod("sort", t_ar_buttons)
  callMethod("sort", t_ar_texts)
  callMethod("sort", t_ar_fields)
  callMethod("sort", t_ar_Images)
  callNamed("put", "<IMAGES>")
  for (var t_sElemName of t_ar_Images.toArray()) {
  callNamed("put", lingoBinary("join", "\t", t_sElemName))
  }

  callNamed("put", "</IMAGES>")
  callNamed("put", "<TEXTS>")
  for (var t_sElemName of t_ar_texts.toArray()) {
  callNamed("put", lingoBinary("join", "\t", t_sElemName))
  }

  callNamed("put", "</TEXTS>")
  callNamed("put", "<FIELDS>")
  for (var t_sElemName of t_ar_fields.toArray()) {
  callNamed("put", lingoBinary("join", "\t", t_sElemName))
  }

  callNamed("put", "</FIELDS>")
  callNamed("put", "<BUTTONS>")
  for (var t_sElemName of t_ar_buttons.toArray()) {
  callNamed("put", lingoBinary("join", "\t", t_sElemName))
  }

  callNamed("put", "</BUTTONS>")
  callNamed("createTimeout", callNamed("getUniqueID"), 2000, symbol("Remove"), callMethod("getID", callNamed("getWindowManager")), t_sID, 1)
  return t_sID;
}

