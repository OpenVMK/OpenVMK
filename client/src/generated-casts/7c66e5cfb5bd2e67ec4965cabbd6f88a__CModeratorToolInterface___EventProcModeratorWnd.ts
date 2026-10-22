// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / _EventProcModeratorWnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProcModeratorWnd(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue, a_sID: LingoValue) {
  switch (tElemID) {
case "mods.open":
  callMethod("ManageModWindows", _this, "mod_menu")
  break;
  }

}

