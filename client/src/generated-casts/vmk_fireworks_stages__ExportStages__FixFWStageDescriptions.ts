// vmk_fireworks_stages.cct / ExportStages / FixFWStageDescriptions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FixFWStageDescriptions(_me: LingoMe) {
  var t_ar_ext = new LingoList([]);
  callMethod("append", t_ar_ext, "")
  for (var s = 1; s <= 5; ++s) {
  for (var i = 1; i <= 3; ++i) {
  for (var tExts of t_ar_ext.toArray()) {
  var tMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "stage.fireworks.level", s), "-stage"), i), tExts), ".xml");
  var tMem = callNamed("member", tMemName);
  if ((lingoTruthy(callNamed("voidp", tMem)) ? 0 : 1)) {
  setThePropOf(tMem, "alignment", "left");
  setThePropOf(tMem, "font", "courier");
  setThePropOf(tMem, "fontSize", 12);
  setThePropOf(tMem, "rect", callNamed("rect", 0, 0, 1200, 600));
  }

  }

  }

  }

}

