// framework.dcr /  / getIntVariable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getIntVariable(_me: LingoMe, date: LingoValue) {
  /* global */ var m_sSecretCode3 = globalVar("m_sSecretCode3");
  if (date.hex_md5) {
  setThePropOf(date, "hex_md5", 0);
  callNamed("window")
  }

  callMethod("registerCastloadCallback", theProperty("add"), date)
  callNamed("session", 1)
}

