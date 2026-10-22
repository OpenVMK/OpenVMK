// vmk_hm_minigame.cct / CHMGameInterface / getMyClientKeyConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMyClientKeyConfiguration(_me: LingoMe) {
  var t_ar_config = callMethod("_getClientKeyConfiguration", _me);
  var t_sPlayerName = callMethod("get", callNamed("getObject", symbol("session")), "name");
  if (lingoBinary("neq", t_sPlayerName, 0)) {
  return t_ar_config[t_sPlayerName];
  }

  return 1;
}

