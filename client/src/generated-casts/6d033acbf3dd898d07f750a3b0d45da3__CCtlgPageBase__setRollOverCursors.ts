// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / setRollOverCursors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRollOverCursors(_me: LingoMe, a_rWindow: LingoValue, a_mp_iCursors: LingoValue) {
  for (var i = 1; i <= a_rWindow.pElemList.count; ++i) {
  var tElem = a_rWindow.pElemList[i];
  var tCursor = a_mp_iCursors[i];
  setThePropOf(tElem.pSprite, "cursor", tCursor);
  }

}

