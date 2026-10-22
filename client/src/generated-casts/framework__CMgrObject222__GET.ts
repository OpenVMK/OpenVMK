// framework.dcr / CMgrObject222 / GET

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GET(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  var tObj = _this.pObjectList[tID];
  if (_this.m_bLogger) {
  var t_sDelim = theProperty("itemDelimiter");
  var t_sCls = callNamed("string", tObj);
  if (callNamed("voidp", tObj)) {
  return 0;
  } else {
  return tObj;
  }

  }

}

