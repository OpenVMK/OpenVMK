// framework.dcr / Core Thread Class / hideLogo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideLogo(_me: LingoMe, _this: LingoValue) {
  callNamed("trace", "hideLogo")
  if (lingoBinary("eq", callNamed("ilk", _this.pLogoSpr), symbol("sprite"))) {
  callNamed("releaseSprite", _this.pLogoSpr.spriteNum)
  setThePropOf(_this, "pLogoSpr", undefined);
  }

  return 1;
}

