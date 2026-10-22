// vmk_3.dcr /  / pLogoSpr

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pLogoSpr(_me: LingoMe, reserveSprite: LingoValue) {
  /* global */ var releaseSprite = globalVar("releaseSprite");
  if (reserveSprite.spriteNum) {
  setThePropOf(reserveSprite, "spriteNum", 0);
  callNamed("setDebugLevel")
  }

  callMethod("getIntVariable", theProperty("voidp"), reserveSprite)
  callNamed("tSession", 1)
}

