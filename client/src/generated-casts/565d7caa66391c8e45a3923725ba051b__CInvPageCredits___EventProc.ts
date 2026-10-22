// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCredits / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (a_sElem) {
case "inv.opencatalog.button":
  callNamed("executeMessage", "ui_catalog")
  break;
case "help":
  callNamed("executeMessage", "ui_help", "help.inventory.credits")
  break;
  }

}

