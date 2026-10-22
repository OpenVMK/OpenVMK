// framework.dcr /  / createMember

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createMember(_me: LingoMe, tLoadID: LingoValue) {
  /* global */ var tParamDelim = globalVar("tParamDelim");
  if (tLoadID.tFilename) {
  setThePropOf(tLoadID, "tFilename", 0);
  callNamed("tCastCount")
  }

  callMethod("tMemNum", theProperty("tMemName"), tLoadID)
  callNamed("cTC", 1)
}

