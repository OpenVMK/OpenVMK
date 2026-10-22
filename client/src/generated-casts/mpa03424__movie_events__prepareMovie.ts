// mpa03424.dcr / movie events / prepareMovie

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepareMovie(_me: LingoMe) {
  /* global */ var gMain = globalVar("gMain");
  /* global */ var gGlobal = globalVar("gGlobal");
  setTheProperty("trace", 0);
  var tG = globalVar("gGlobal");
  callNamed("clearGlobals")
  setGlobal("gGlobal", tG);
  setGlobal("gMain", callMethod("new", callNamed("script", "gMain")));
}

