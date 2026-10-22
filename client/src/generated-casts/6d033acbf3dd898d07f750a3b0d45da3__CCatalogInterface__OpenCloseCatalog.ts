// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / OpenCloseCatalog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenCloseCatalog(_me: LingoMe, _this: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rWindow"))) {
  var t_rObj = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_rObj)) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 15)
  } else {
  return 0;
  }

  } else {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("CloseCatalog", meProp(_me, "m_rCurPageObj"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_iPageToShow", undefined);
  setMeProp(_me, "m_SubpageToShow", undefined);
  }

  }

}

