// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / getRollOverCursors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRollOverCursors(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue, a_mp_sElem_iCursors: LingoValue) {
  var t_iCount = a_rWindow.pElemList.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sName = callMethod("getPropAt", a_rWindow.pElemList, i);
  var t_rElem = a_rWindow.pElemList[i];
  callMethod("addProp", a_mp_sElem_iCursors, t_sName, t_rElem.pSprite.cursor)
  }

}

