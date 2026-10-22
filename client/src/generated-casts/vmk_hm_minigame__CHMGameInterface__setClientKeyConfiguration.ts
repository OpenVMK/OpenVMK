// vmk_hm_minigame.cct / CHMGameInterface / setClientKeyConfiguration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setClientKeyConfiguration(_me: LingoMe, t_iState: LingoValue) {
  var t_ar_config = callMethod("_getClientKeyConfiguration", _me);
  var t_sPlayerName = callMethod("get", callNamed("getObject", symbol("session")), "name");
  if (lingoBinary("neq", t_sPlayerName, 0)) {
  t_ar_config[t_sPlayerName] = t_iState;
  callNamed("setPref", "vmk_hmg", callNamed("string", t_ar_config))
  }

}

