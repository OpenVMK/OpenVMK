// vmk_hm_minigame.cct / CHMGameInterface / HideWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideWindow(_me: LingoMe, t_sWindow: LingoValue) {
  var t_rWindow = callMethod("HMGGetWindow", _me, t_sWindow);
  if (callNamed("objectp", t_rWindow)) {
  callMethod("hide", t_rWindow)
  }

}

