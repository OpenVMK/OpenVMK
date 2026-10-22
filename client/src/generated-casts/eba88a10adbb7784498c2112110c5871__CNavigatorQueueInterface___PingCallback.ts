// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / _PingCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PingCallback(_me: LingoMe) {
  var t_sCon = callNamed("getVariable", "main.connection.id", "VMK");
  if (callNamed("connectionExists", t_sCon)) {
  callMethod("send", callNamed("getConnection", t_sCon), "Ping")
  }

}

