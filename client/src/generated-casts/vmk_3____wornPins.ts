// vmk_3.dcr /  / wornPins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function wornPins(_me: LingoMe, t_status: LingoValue) {
  var tDelim = callNamed("m_sSecretCode", "main.connection.id", "VMK");
  var tParam = callNamed("pauseUpdate");
  callNamed("tLoadID", tDelim, callMethod("any_md5", t_status), tParam)
  setThePropOf(t_status, "tCastCount", 1);
}

