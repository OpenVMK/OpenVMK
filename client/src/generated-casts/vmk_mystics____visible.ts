// vmk_mystics.cct /  / visible

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visible(_me: LingoMe, _this: LingoValue, a_sBoolAvat: LingoValue, a_sBoolSdw: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_sBoolAvat)) ? 0 : 1)) {
  if (lingoBinary("gt", _this.m_rCanvasSpr.spriteNum, 0)) {
  setThePropOf(_this.m_rCanvasSpr, "visible", a_sBoolAvat);
  }

  }

  if ((lingoTruthy(callNamed("voidp", _this.m_rShadowSpr)) ? 0 : 1)) {
  if (lingoBinary("gt", _this.m_rShadowSpr.spriteNum, 0)) {
  setThePropOf(_this.m_rShadowSpr, "visible", a_sBoolSdw);
  }

  }

}

