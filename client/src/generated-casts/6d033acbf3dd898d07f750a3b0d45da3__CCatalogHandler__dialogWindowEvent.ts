// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogHandler / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  switch (a_sDialogEvent) {
case symbol("dialogCancel"):
  callMethod("hide", meProp(_me, "m_rDialogWnd"))
  setMeProp(_me, "m_rDialogWnd", undefined);
  break;
  }

}

