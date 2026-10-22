// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CDialogWindow / MoveDialogWindowPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MoveDialogWindowPos(_me: LingoMe, a_iX: LingoValue, a_iY: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
  if (callNamed("objectp", tWndObj)) {
  callMethod("moveTo", tWndObj, a_iX, a_iY)
  }

}

