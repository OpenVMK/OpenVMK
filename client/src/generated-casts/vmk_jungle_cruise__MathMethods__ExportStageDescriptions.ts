// vmk_jungle_cruise.cct / MathMethods / ExportStageDescriptions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExportStageDescriptions(_me: LingoMe) {
  var Files = new LingoList([]);
  callMethod("append", Files, "dock")
  callMethod("append", Files, "cambodian")
  callMethod("append", Files, "indy")
  callMethod("append", Files, "safari")
  callMethod("append", Files, "tent")
  callMethod("append", Files, "tiki")
  for (var tFile of Files.toArray()) {
  for (var i = 1; i <= 3; ++i) {
  var tMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", tFile, ".stage"), i), ".xml");
  var tMem = callNamed("member", tMemName);
  if ((lingoTruthy(callNamed("voidp", tMem)) ? 0 : 1)) {
  var f = callMethod("new", callNamed("xtra", "FileIO"));
  var tPath = _movie.path;
  var tMedia = undefined;
  if (callNamed("objectp", f)) {
  callMethod("createFile", f, lingoBinary("join", tPath, tMemName))
  if (lingoBinary("eq", callMethod("error", f, callMethod("status", f)), "OK")) {
  callMethod("openfile", f, lingoBinary("join", tPath, tMemName), 2)
  if (lingoBinary("eq", callMethod("error", f, callMethod("status", f)), "OK")) {
  callMethod("writeString", f, tMem.text)
  callMethod("closeFile", f)
  } else {
  callNamed("put", lingoBinary("joinPad", callMethod("status", f), callMethod("error", f, callMethod("status", f))))
  }

  } else {
  callNamed("put", lingoBinary("joinPad", callMethod("status", f), callMethod("error", f, callMethod("status", f))))
  }

  continue;
  }

  callNamed("put", lingoBinary("joinPad", callMethod("status", f), callMethod("error", f, callMethod("status", f))))
  }

  }

  }

}

