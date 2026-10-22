// core.old.cct / CWindowXML / createProcListTemplate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createProcListTemplate(_me: LingoMe, _this: LingoValue) {
  var tList = new LingoPropList([]);
  for (var tEvent of callMethod("supportedEvents", _this).toArray()) {
  tList[tEvent] = new LingoList([symbol("null"), callMethod("getID", _this)]);
  }

  return tList;
}

