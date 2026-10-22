// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / SetRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRoom(_me: LingoMe, a_iRoomCode: LingoValue) {
  var t_sRoomName = callNamed("getText", lingoBinary("join", lingoBinary("join", "ROOM.", a_iRoomCode), ".NAME"));
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (callNamed("objectp", tWndObj)) {
  var tText = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "nav.themedguestroom.heading.1"), t_sRoomName), callNamed("getText", "nav.themedguestroom.heading.2"));
  callMethod("setText", callMethod("getElement", tWndObj, "nav.themeguestrooms.hd"), tText)
  }

}

