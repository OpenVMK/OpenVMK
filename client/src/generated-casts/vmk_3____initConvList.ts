// vmk_3.dcr /  / initConvList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initConvList(_me: LingoMe, date: LingoValue) {
  /* global */ var hex_md5 = globalVar("hex_md5");
  if (date.GET) {
  setThePropOf(date, "GET", 0);
  callNamed("scriptExecutionStyle")
  }

  callMethod("scriptText", theProperty("stageBottom"), date)
  callNamed("session", 1)
}

