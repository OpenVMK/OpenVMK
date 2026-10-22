// vmk_casual_checkers.cct / CCheckersTrickLevitation / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removePrepare", callMethod("getID", _this))
  callNamed("releaseSprite", meProp(_me, "m_ar_rSprites")[1].spriteNum)
  callNamed("releaseSprite", meProp(_me, "m_ar_rSprites")[2].spriteNum)
  callNamed("callAncestor", symbol("deconstruct"), _this)
}

