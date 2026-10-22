// core.old.cct / CObject / delay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function delay(_me: LingoMe, tTime: LingoValue, tMethod: LingoValue, tArgument: LingoValue) {
  if (!lingoTruthy(callNamed("integerp", tTime))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Integer expected:", tTime), symbol("delay"));
  }

  if (!lingoTruthy(callNamed("symbolp", tMethod))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol expected:", tMethod), symbol("delay"));
  }

  var tUniqueId = lingoBinary("joinPad", lingoBinary("joinPad", "Delay", callMethod("getID", _me)), theProperty("milliSeconds"));
  callMethod("new", callNamed("timeout", tUniqueId), tTime, symbol("executeDelay"), _me)
  var tList = new LingoPropList([symbol("method"), tMethod, symbol("argument"), tArgument]);
  _me.delays[tUniqueId] = tList;
  return tUniqueId;
}

