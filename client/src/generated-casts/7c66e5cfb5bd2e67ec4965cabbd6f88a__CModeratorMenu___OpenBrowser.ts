// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / _OpenBrowser

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OpenBrowser(_me: LingoMe, _this: LingoValue) {
  var t_sURL = callNamed("getVariable", "callforhelpbrowser.url");
  if (callNamed("stringp", t_sURL)) {
  callNamed("gotoNetPage", t_sURL, "_blank")
  }

}

