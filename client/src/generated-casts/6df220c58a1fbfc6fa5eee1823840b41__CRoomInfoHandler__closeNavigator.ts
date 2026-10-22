// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / closeNavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeNavigator(_me: LingoMe) {
  callNamed("executeMessage", symbol("ui_StopWelcomeSound"))
  var t_NavigatorWindow = "Navigator Window";
  if (callNamed("windowExists", t_NavigatorWindow)) {
  var tWndObj = callNamed("getWindow", t_NavigatorWindow);
  if (callMethod("getProperty", tWndObj, symbol("visible"))) {
  callNamed("executeMessage", symbol("ui_navigator"))
  }

  }

}

