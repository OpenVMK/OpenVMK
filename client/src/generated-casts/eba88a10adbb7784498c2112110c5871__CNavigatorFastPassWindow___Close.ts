// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / _Close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Close(_me: LingoMe, _this: LingoValue) {
  if (callNamed("timeoutExists", "FlashFastPass")) {
  callNamed("removeTimeout", "FlashFastPass")
  }

  setMeProp(_me, "m_iFlashCountdown", 0);
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  setMeProp(_me, "m_mp_FastPassData", undefined);
  }

}

