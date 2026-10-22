// vmk_domestic.cct /  / visible

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visible(_me: LingoMe, _this: LingoValue, a_sBool: LingoValue) {
  if (lingoBinary("gt", _this.m_rSprite.spriteNum, 0)) {
  setThePropOf(_this.m_rSprite, "visible", a_sBool);
  }

}

