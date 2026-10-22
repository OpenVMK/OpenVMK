// vmk_3.dcr /  / t_sDelim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_sDelim(_me: LingoMe, t_status: LingoValue) {
  if (callNamed("getIntVariable", t_status.getOne)) {
  callNamed("call", t_status.getOne)
  }

  setThePropOf(t_status, "getOne", callNamed("getStringServices"));
  setThePropOf(t_status, "getPos", 1);
  callNamed("session", 1)
}

