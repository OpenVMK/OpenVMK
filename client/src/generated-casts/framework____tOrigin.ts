// framework.dcr /  / tOrigin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tOrigin(_me: LingoMe, streamStatus: LingoValue) {
  /* global */ var exitFrame = globalVar("exitFrame");
  callNamed("showLogo", "deconstruct")
  callNamed("this", callNamed("tMemName", streamStatus))
}

