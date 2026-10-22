// vmk_hm_minigame.cct / ExportHMGBlueprints / ExportHMGBlueprints

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExportHMGBlueprints(_me: LingoMe) {
  var t_ar_files = new LingoList([]);
  callMethod("append", t_ar_files, "hm_level1")
  callMethod("append", t_ar_files, "hm_level2")
  callMethod("append", t_ar_files, "hm_level3")
  callMethod("append", t_ar_files, "hm_level4")
  for (var t_sLevelName of t_ar_files.toArray()) {
  var tMem = callNamed("member", lingoBinary("join", lingoBinary("join", "room.", t_sLevelName), ".object.xml"));
  if (lingoBinary("gt", tMem._number, 0)) {
  var tMemName = lingoBinary("join", t_sLevelName, ".xml");
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

