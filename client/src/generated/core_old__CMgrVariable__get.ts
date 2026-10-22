// core.old.cct / CMgrVariable / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, tVariable: LingoValue, tDefault: LingoValue) {
  var tvalue = _me.pItemList[tVariable];
  if (callNamed("voidp", tvalue)) {
  var tError = lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Variable not found:", "\""), tVariable), "\"");
  if (!lingoTruthy(callNamed("voidp", tDefault))) {
  tvalue = tDefault;
  tError = lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", tError, "\r"), "Using given default:"), tDefault);
  } else {
  tvalue = 0;
  }

  callNamed("error", _me, tError, symbol("get"))
  }

  return tvalue;
}

