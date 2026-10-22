// core.old.cct / CMgrText / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, tKey: LingoValue, tDefault: LingoValue) {
  var tText = _me.pItemList[tKey];
  if (callNamed("voidp", tText)) {
  var t_LowerCaseKey = callNamed("convertToLowerCase", tKey);
  tText = _me.pItemList[t_LowerCaseKey];
  }

  if (callNamed("voidp", tText)) {
  var tError = lingoBinary("joinPad", "Text not found:", tKey);
  if (!lingoTruthy(callNamed("voidp", tDefault))) {
  tText = tDefault;
  tError = lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", tError, "\r"), "Using given default:"), tDefault);
  } else {
  tText = tKey;
  }

  callNamed("error", _me, tError, symbol("get"))
  }

  return tText;
}

