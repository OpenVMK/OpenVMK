// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  setMeProp(_me, "m_kMode", symbol("select"));
  if (callMethod("merge", meProp(_me, "m_rWindow"), "vmk_inv_pins.window")) {
  callMethod("render", meProp(_me, "m_rGridRenderer"), new LingoPropList([]), callMethod("getElement", meProp(_me, "m_rWindow"), "thumbs.grid.b"))
  callMethod("render", meProp(_me, "m_rWornRenderer"), new LingoPropList([]), callMethod("getElement", meProp(_me, "m_rWindow"), "thumbs.grid.h"))
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.cancelcombine.button"), symbol("visible"), 0)
  callMethod("RegisterItemListCallback", callMethod("GetInventory", callNamed("getThread", "inventory").component, 3), _this, symbol("UpdateWornPins"))
  return 1;
  } else {
  return 0;
  }

}

