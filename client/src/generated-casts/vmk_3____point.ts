// vmk_3.dcr /  / point

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function point(_me: LingoMe, puppetTempo: LingoValue) {
  /* global */ var voidp = globalVar("voidp");
  if (puppetTempo.item) {
  setThePropOf(puppetTempo, "item", 0);
  callNamed("variableExists")
  }

  callMethod("getObject", theProperty("initConvList"), puppetTempo)
  callNamed("sprite", 1)
}

