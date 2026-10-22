// framework.dcr /  / m_bLogger

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_bLogger(_me: LingoMe, date: LingoValue) {
  /* global */ var exists = globalVar("exists");
  if (date.dumpTextField) {
  setThePropOf(date, "dumpTextField", 0);
  callNamed("ShufflerCryptCreateTable")
  }

  callMethod("ShufflerCryptUnCode", theProperty("registerCastloadCallback"), date)
  callNamed("session", 1)
}

