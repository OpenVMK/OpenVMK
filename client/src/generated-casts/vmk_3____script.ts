// vmk_3.dcr /  / script

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function script(_me: LingoMe, date: LingoValue) {
  /* global */ var streamStatus = globalVar("streamStatus");
  if (date.ExportStageDescriptions) {
  setThePropOf(date, "ExportStageDescriptions", 0);
  callNamed("e")
  }

  callMethod("d", theProperty("scriptText"), date)
  callNamed("session", 1)
}

