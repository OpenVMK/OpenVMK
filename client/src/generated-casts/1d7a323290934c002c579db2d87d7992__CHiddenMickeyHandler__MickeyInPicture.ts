// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / MickeyInPicture

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MickeyInPicture(_me: LingoMe, tMsg: LingoValue) {
  var tRequestID = callMethod("GetIntFrom", tMsg.connection);
  var tNewMickeyFound = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("eq", tRequestID, meProp(_me, "m_requestID"))) {
  callNamed("executeMessage", symbol("MickeyInPicture"), tNewMickeyFound)
  }

}

