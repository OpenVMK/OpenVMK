// fb329984daeb374016fc0289347418de.cct / CWallPhotoViewer / eventProcPhotoPoster

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcPhotoPoster(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "fto.taketocatalog.button":
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 765, new LingoPropList([symbol("int"), meProp(_me, "m_iRef")]))
  break;
case "close":
  if (callNamed("windowExists", meProp(_me, "m_sWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  }

  break;
  }

  }

}

