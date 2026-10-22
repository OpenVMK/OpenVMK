// mpa03424.dcr / gMain / loadCheck

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadCheck(_me: LingoMe) {
  /* global */ var gGlobal = globalVar("gGlobal");
  setMeProp(_me, "pNetVal", callNamed("getNetText", lingoBinary("join", lingoBinary("join", theProperty("moviePath"), "loadcheck.txt?"), callNamed("random", 10000))));
  setMeProp(_me, "pStatus", symbol("waitLoadCheck"));
  setMeProp(_me, "pTime", 0);
}

