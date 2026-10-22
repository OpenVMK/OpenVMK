// core.old.cct / CMgrObject / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  var tObj = meProp(_me, "pObjectList")[tID];
  if (meProp(_me, "m_bLogger")) {
  var t_sDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "\"");
  var t_sCls = chunkOf(callNamed("string", tObj), "item", 2, 0);
  setTheProperty("itemDelimiter", t_sDelim);
  m_sLogger = m_sLogger + lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", theProperty("long time"), "Access"), "\""), tID), "\""), "/"), t_sCls), "\r");
  }

  if (callNamed("voidp", tObj)) {
  return 0;
  } else {
  return tObj;
  }

}

