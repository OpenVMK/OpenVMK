// vmk_3.dcr / CInit / DTOR

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DTOR(_me: LingoMe) {
  /* global */ var oErrorType = globalVar("oErrorType");
  if (_me.m_bRunning) {
  setThePropOf(_me, "m_bRunning", 0);
  callNamed("stopClient")
  }

  callMethod("deleteOne", theProperty("actorList"), _me)
  return 1;
}

