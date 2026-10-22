// vmk_mystics.cct /  / Unselect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Unselect(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", _this.m_rRenderer)) {
  callMethod("HideArrow", _this.m_rRenderer)
  }

  return callNamed("callAncestor", symbol("Unselect"), _this);
}

