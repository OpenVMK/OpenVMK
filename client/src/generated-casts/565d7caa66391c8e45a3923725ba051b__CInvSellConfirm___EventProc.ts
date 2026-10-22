// 565d7caa66391c8e45a3923725ba051b.cct / CInvSellConfirm / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvt: LingoValue, a_sElm: LingoValue, a_vPrm: LingoValue, a_sWnd: LingoValue) {
  switch (a_sElm) {
case "close":
case "basic.dialog1.button1":
  callNamed("removeObject", callMethod("getID", _this))
  break;
case "help":
  callNamed("executeMessage", "ui_help")
  break;
  break;
  }

}

