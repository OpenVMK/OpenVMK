// vmk_monorail_station_handler.cct / CBezierAnimator / toString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toString(_me: LingoMe) {
  var objInfo = lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", "\r", "Object:"), _me), "\r");
  var hs = "";
  for (var h of callMethod("handlers", _me).toArray()) {
  hs = lingoBinary("join", lingoBinary("join", hs, callNamed("string", h)), "() ");
  }

  objInfo = objInfo + lingoBinary("join", hs, "\r");
  for (var i = 1; i <= callNamed("count", _me); ++i) {
  var propName = callNamed("getPropAt", _me, i);
  var propValue = callNamed("getaProp", _me, propName);
  objInfo = objInfo + lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", propName, ":"), propValue), "\r");
  }

  callNamed("put", objInfo)
}

