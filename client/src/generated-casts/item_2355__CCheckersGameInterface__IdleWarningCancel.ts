// item_2355.cct / CCheckersGameInterface / IdleWarningCancel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IdleWarningCancel(_me: LingoMe, _this: LingoValue) {
  if (callNamed("DialogWindowExists", "CheckersIdleWarning")) {
  callNamed("removeDialogWindow", "CheckersIdleWarning")
  }

}

