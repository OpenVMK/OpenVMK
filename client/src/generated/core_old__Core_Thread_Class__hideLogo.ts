// core.old.cct / Core Thread Class / hideLogo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideLogo(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", meProp(_me, "pLogoSpr")), symbol("sprite"))) {
  callNamed("releaseSprite", meProp(_me, "pLogoSpr").spriteNum)
  setMeProp(_me, "pLogoSpr", undefined);
  }

  return 1;
}

