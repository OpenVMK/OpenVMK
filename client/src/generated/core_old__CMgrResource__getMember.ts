// core.old.cct / CMgrResource / getMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMember(_me: LingoMe, tMemName: LingoValue) {
  var tMemNum = meProp(_me, "pAllMemNumList")[tMemName];
  if (callNamed("voidp", tMemNum)) {
  tMemNum = 0;
  }

  return callNamed("member", tMemNum);
}

