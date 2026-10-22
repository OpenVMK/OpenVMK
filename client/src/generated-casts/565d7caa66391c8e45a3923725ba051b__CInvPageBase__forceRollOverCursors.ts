// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / forceRollOverCursors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function forceRollOverCursors(_me: LingoMe, a_rWindow: LingoValue, a_iCursor: LingoValue) {
  var t_iCount = a_rWindow.pElemList.count;
  for (var i = 1; i <= t_iCount; ++i) {
  setThePropOf(a_rWindow.pElemList[i].pSprite, "cursor", a_iCursor);
  }

}

