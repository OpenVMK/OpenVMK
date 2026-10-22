// vmk_hm_minigame.cct / CollisionEngineMathMethods / ExportStageHMGDescriptions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExportStageHMGDescriptions(_me: LingoMe) {
  var cst = "vmk_minigame/vmk_hm_stages";
  for (var i = 1; i <= callNamed("castLib", cst).member.count; ++i) {
  var tMem = callNamed("member", i, cst);
  if (lingoBinary("gt", tMem._number, 0)) {
  var tMemName = tMem.name;
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

