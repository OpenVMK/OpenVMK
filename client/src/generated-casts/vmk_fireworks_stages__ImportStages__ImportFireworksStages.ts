// vmk_fireworks_stages.cct / ImportStages / ImportFireworksStages

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ImportFireworksStages(_me: LingoMe) {
  var t_ar_ext = new LingoList([]);
  callMethod("append", t_ar_ext, "")
  for (var s = 1; s <= 5; ++s) {
  for (var i = 1; i <= 3; ++i) {
  for (var tExts of t_ar_ext.toArray()) {
  var tMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "stage.fireworks.level", s), "-stage"), i), tExts), ".xml");
  var tMem = callNamed("new", symbol("field"));
  setThePropOf(tMem, "name", tMemName);
  if ((lingoTruthy(callNamed("voidp", tMem)) ? 0 : 1)) {
  var f = callMethod("new", callNamed("xtra", "FileIO"));
  var tPath = _movie.path;
  var tMedia = undefined;
  if (callNamed("objectp", f)) {
  callMethod("openfile", f, lingoBinary("join", tPath, tMemName), 1)
  if (lingoBinary("eq", callMethod("error", f, callMethod("status", f)), "OK")) {
  var tString = callMethod("readFile", f);
  setThePropOf(tMem, "text", tString);
  callMethod("closeFile", f)
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

}

