// vmk_3.dcr / CMgrObject222 / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, _this: LingoValue) {
  var i = 1;
  while (lingoBinary("lte", i, _this.pObjectList.count)) {
  var tProp = callNamed("getPropAt", _this.pObjectList, i);
  if (callNamed("symbolp", tProp)) {
  tProp = lingoBinary("join", "#", tProp);
  }

  callNamed("put", lingoBinary("join", lingoBinary("join", tProp, ":"), _this.pObjectList[i]))
  i = lingoBinary("add", i, 1);
  }

  return 1;
}

