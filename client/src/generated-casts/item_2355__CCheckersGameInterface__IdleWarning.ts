// item_2355.cct / CCheckersGameInterface / IdleWarning

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IdleWarning(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("DialogWindowExists", "CheckersIdleWarning")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckersIdleWarning", 1, 0);
  callMethod("setText", t, callNamed("getText", "checkers.idle.warning.title"), callNamed("getText", "checkers.idle.warning"), "Ok", "foo")
  callMethod("show", t)
  }

}

