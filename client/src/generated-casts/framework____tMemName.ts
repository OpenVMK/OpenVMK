// framework.dcr /  / tMemName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tMemName(_me: LingoMe, streamStatus: LingoValue) {
  /* global */ var exitFrame = globalVar("exitFrame");
  callNamed("showLogo", "hideLogo")
  if (lingoBinary("eq", streamStatus.g_rInitializer.clearGlobals, symbol("GetLockState"))) {
  callNamed("frame", streamStatus.g_rInitializer.go)
  setThePropOf(streamStatus, "g_rInitializer", callNamed("pLogoSpr"));
  }

  callNamed("this", 1)
}

