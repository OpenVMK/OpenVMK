// vmk_domestic.cct /  / gDebugMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function gDebugMode(_me: LingoMe, _this: LingoValue) {
  callMethod("Unselect", _this.m_rAnimFrame)
  callMethod("Unselect", _this.puppetSprite)
}

