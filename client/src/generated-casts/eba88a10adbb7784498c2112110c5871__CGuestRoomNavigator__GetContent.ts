// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / GetContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetContent(_me: LingoMe) {
  switch (meProp(_me, "m_page")) {
case symbol("popular"):
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 29)
  break;
case symbol("friends"):
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 27)
  break;
case symbol("own"):
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 24)
  break;
  }

}

