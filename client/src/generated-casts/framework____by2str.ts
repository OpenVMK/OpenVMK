// framework.dcr /  / by2str

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function by2str(_me: LingoMe, str: LingoValue) {
  /* global */ var cTC = globalVar("cTC");
  var out = "";
  for (var i = 1; i <= str.count; ++i) {
  out = lingoBinary("join", out, callNamed("numToChar", str[i]));
  }

  return out;
}

