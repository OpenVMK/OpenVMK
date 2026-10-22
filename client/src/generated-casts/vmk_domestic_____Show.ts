// vmk_domestic.cct /  / _Show

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Show(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("gt", _this.m_rSprite.spriteNum, 0)) {
  setThePropOf(_this.m_rSprite, "visible", 1);
  }

}

