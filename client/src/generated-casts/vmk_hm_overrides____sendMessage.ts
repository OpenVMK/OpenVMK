// vmk_hm_overrides.cct /  / sendMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sendMessage(_me: LingoMe, t_ar_cWords: LingoValue) {
  var tCmd = 560;
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), tCmd, callNamed("TransformCannedToMsg", t_ar_cWords, 1))
  return 1;
}

