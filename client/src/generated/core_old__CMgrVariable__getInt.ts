// core.old.cct / CMgrVariable / getInt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getInt(_me: LingoMe, _this: LingoValue, tVariable: LingoValue, tDefault: LingoValue) {
  var tvalue = callNamed("integer", _this.pItemList[tVariable]);
  if (!lingoTruthy(callNamed("integerp", tvalue))) {
  var tError = lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Variable not found:", "\""), tVariable), "\"");
  if (!lingoTruthy(callNamed("voidp", tDefault))) {
  tvalue = tDefault;
  tError = lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", tError, "\r"), "Using given default:"), tDefault);
  }

  callNamed("error", _this, tError, symbol("getInt"))
  }

  return tvalue;
}

