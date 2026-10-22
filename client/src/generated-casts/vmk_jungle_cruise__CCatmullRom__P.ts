// vmk_jungle_cruise.cct / CCatmullRom / P

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function P(_me: LingoMe, i: LingoValue, t: LingoValue) {
  var px = float(0);
  var py = float(0);
  for (var j = -float(2); j <= 1; ++j) {
  px = lingoBinary("add", px, lingoBinary("mul", callMethod("b", _me, j, t), meProp(_me, "pts")[lingoBinary("add", i, j)].locH));
  py = lingoBinary("add", py, lingoBinary("mul", callMethod("b", _me, j, t), meProp(_me, "pts")[lingoBinary("add", i, j)].locV));
  }

  return callNamed("point", px, py);
}

