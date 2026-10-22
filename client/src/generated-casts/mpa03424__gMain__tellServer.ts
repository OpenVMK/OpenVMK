// mpa03424.dcr / gMain / tellServer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tellServer(_me: LingoMe) {
  /* global */ var gGlobal = globalVar("gGlobal");
  var tDomain = callNamed("externalParamValue", "sw7");
  callNamed("getNetText", lingoBinary("join", tDomain, "/b?method=got_loader"))
  setMeProp(_me, "pStatus", symbol("loadCheck"));
}

