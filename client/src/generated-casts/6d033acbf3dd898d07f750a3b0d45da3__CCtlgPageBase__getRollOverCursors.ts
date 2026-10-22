// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / getRollOverCursors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRollOverCursors(_me: LingoMe, a_rWindow: LingoValue, o_mp_iCursors: LingoValue) {
  for (var i = 1; i <= a_rWindow.pElemList.count; ++i) {
  var tName = callMethod("getPropAt", a_rWindow.pElemList, i);
  var tElem = a_rWindow.pElemList[i];
  callMethod("addProp", o_mp_iCursors, tName, tElem.pSprite.cursor)
  }

}

