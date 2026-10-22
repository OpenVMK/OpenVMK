// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / getSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSprite(_me: LingoMe, _this: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rSprite"))) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _this))));
  setMeProp(_me, "m_bReleaseSprite", 1);
  }

  return meProp(_me, "m_rSprite");
}

