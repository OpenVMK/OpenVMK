// vmk_fireworks.cct / CFireworksGameInterface / generateBitmapNumbers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function generateBitmapNumbers(_me: LingoMe) {
  var t_ar_numbers = new LingoList([]);
  for (var i = 0; i <= 9; ++i) {
  callMethod("append", t_ar_numbers, callNamed("member", lingoBinary("join", "fw_", i)))
  }

  return t_ar_numbers;
}

