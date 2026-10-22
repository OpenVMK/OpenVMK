// mpa03424.dcr / gMain / frameEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function frameEvent(_me: LingoMe) {
  /* global */ var gGlobal = globalVar("gGlobal");
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("loadCheck"))) {
  callMethod("loadCheck", _me)
  } else {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("waitLoadCheck"))) {
  callMethod("waitLoadCheck", _me)
  } else {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("waitLoadGame"))) {
  callMethod("doWaitLoadGame", _me)
  } else {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("tellServer"))) {
  callMethod("tellServer", _me)
  }

  }

  }

  }

  setMeProp(_me, "pLoadTime", lingoBinary("add", meProp(_me, "pLoadTime"), 1));
  callMethod("frameEvent", meProp(_me, "pSign"))
}

