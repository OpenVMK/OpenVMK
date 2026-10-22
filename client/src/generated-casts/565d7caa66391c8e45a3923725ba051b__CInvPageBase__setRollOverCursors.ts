// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / setRollOverCursors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRollOverCursors(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue, a_mp_sElem_iCursors: LingoValue) {
  var t_iCount = a_rWindow.pElemList.count;
  for (var i = 1; i <= t_iCount; ++i) {
  setThePropOf(a_rWindow.pElemList[i].pSprite, "cursor", a_mp_sElem_iCursors[i]);
  }

}

