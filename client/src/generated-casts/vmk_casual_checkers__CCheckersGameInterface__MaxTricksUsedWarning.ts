// vmk_casual_checkers.cct / CCheckersGameInterface / MaxTricksUsedWarning

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MaxTricksUsedWarning(_me: LingoMe, _this: LingoValue, a_iMaxTricks: LingoValue) {
  if ((lingoTruthy(callNamed("DialogWindowExists", "CheckersTricksUsedWarning")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckersTricksUsedWarning", 1, 0);
  callMethod("setText", t, callNamed("getText", "checkers.max.tricks.used.title"), callNamed("replaceChunks", callNamed("getText", "checkers.max.tricks.used"), "/$", callNamed("string", a_iMaxTricks)), "Ok", "foo")
  callMethod("show", t)
  }

}

