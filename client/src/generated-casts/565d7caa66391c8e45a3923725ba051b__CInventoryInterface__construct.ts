// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bInitialized", 0);
  setMeProp(_me, "m_rCurPageObj", undefined);
  callNamed("registerMessage", symbol("ui_inventory"), callMethod("getID", _this), symbol("ShowHideInventory"))
  return 1;
}

