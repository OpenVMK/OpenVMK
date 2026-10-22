// vmk_tomorrowland_arcade.cct / CArcadeInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowID", "Arcade");
  callNamed("registerMessage", "ui_Arcade", callMethod("getID", _me), symbol("showHideArcade"))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("navigator"), 1]))
  return 1;
}

