// 239fb1d2675fc448140198b03238814c.cct / CTempViewSprCount / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("releaseSprite", meProp(_me, "pSpr").spriteNum)
  callMethod("erase", meProp(_me, "pMem"))
  callNamed("removeTimeout", "SprLimitRefresh")
}

