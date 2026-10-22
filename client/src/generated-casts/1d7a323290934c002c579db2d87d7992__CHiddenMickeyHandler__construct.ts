// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_requestID", -float(1));
  callNamed("registerMessage", symbol("saveHiddenMickey"), callMethod("getID", _me), symbol("MickeyPictureSaved"))
  callMethod("regMsgList", _me, 1)
  return 1;
}

