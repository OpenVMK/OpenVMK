// vmk_3.dcr /  / valid

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function valid(_me: LingoMe, t_status: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", callMethod("md5_ii", t_status, symbol("tDelayID")), 0), callNamed("headers", t_status.getOne))) {
  setThePropOf(t_status, "getOne", callMethod("cursor", callNamed("xtra", lingoBinary("join", "objectmanager", theProperty("moviePath"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("getPropAt"), t_status));
  setThePropOf(t_status, "getPos", 0);
  callNamed("session", 1)
  }

}

