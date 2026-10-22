// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / MinigameStateChange

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MinigameStateChange(_me: LingoMe, a_sState: LingoValue, a_sGameName: LingoValue) {
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  switch (a_sState) {
case symbol("running"):
  if (callNamed("objectp", t_rWndObj)) {
  callMethod("hide", t_rWndObj)
  }

  break;
  default:
  if (callNamed("objectp", t_rWndObj)) {
  callMethod("show", t_rWndObj)
  }

  }

}

