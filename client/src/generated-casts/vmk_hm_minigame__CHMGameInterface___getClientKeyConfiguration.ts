// vmk_hm_minigame.cct / CHMGameInterface / _getClientKeyConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _getClientKeyConfiguration(_me: LingoMe) {
  var t_ar_config = new LingoPropList([]);
  var t_sPref = callNamed("getPref", "vmk_hmg");
  var t_bAllowTutorials = 1;
  if (callNamed("stringp", t_sPref)) {
  t_ar_config = callNamed("value", t_sPref);
  }

  return t_ar_config;
}

