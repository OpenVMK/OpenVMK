// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / RequestHiddenMickeyTest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestHiddenMickeyTest(_me: LingoMe, i_pCoordinates: LingoValue) {
  setMeProp(_me, "m_requestID", theProperty("milliSeconds"));
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 770, new LingoPropList([symbol("int"), meProp(_me, "m_requestID"), symbol("int"), i_pCoordinates.locH, symbol("int"), i_pCoordinates.locV]))
}

