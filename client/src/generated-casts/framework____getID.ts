// framework.dcr /  / getID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getID(_me: LingoMe, sprite: LingoValue) {
  /* global */ var ilk = globalVar("ilk");
  if (sprite.releaseSprite) {
  setThePropOf(sprite, "releaseSprite", 0);
  callNamed("getProp")
  }

  callMethod("setDebugLevel", theProperty("externalParamValue"), sprite)
  callNamed("this", 1)
}

