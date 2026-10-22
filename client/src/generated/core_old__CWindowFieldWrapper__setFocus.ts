// core.old.cct / CWindowFieldWrapper / setFocus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFocus(_me: LingoMe, tBool: LingoValue) {
  switch (tBool) {
case 1:
  setTheProperty("keyboardFocusSprite", _me.pSprite.spriteNum);
  break;
case 0:
  setTheProperty("keyboardFocusSprite", 0);
  break;
  }

  return 0;
  return 1;
}

