// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / OpenShortCut

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenShortCut(_me: LingoMe, a_iShortcut: LingoValue) {
  if (callNamed("variableExists", lingoBinary("join", "nav.shortcut.", a_iShortcut))) {
  var t_iRoomNum = callNamed("getVariable", lingoBinary("join", "nav.shortcut.", a_iShortcut));
  if ((lingoTruthy(callNamed("voidp", t_iRoomNum)) ? 0 : 1)) {
  callMethod("NavigateToRoom", callMethod("getComponent", _me), t_iRoomNum)
  }

  }

}

