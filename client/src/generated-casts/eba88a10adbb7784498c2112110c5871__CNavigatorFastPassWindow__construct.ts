// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sWindowID", "NavFastPassWindow");
  setMeProp(_me, "m_mp_FastPassData", undefined);
  setMeProp(_me, "m_iFlashingTime", callNamed("getVariable", "fast.pass.flash.time"));
  setMeProp(_me, "m_iFlashCountdown", 0);
  callNamed("registerMessage", symbol("ui_Fastpass"), callMethod("getID", _this), symbol("BringOnTop"))
  callNamed("registerMessage", symbol("MinigameState"), callMethod("getID", _this), symbol("MinigameStateChange"))
  return 1;
}

