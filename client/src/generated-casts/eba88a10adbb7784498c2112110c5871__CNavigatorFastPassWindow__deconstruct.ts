// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("timeoutExists", "FlashFastPass")) {
  callNamed("removeTimeout", "FlashFastPass")
  }

  callNamed("unregisterMessage", symbol("MinigameState"))
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  return 1;
}

