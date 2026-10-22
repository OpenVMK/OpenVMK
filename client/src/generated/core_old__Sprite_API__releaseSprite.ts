// core.old.cct / Sprite API / releaseSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function releaseSprite(_me: LingoMe, tSprNum: LingoValue) {
  return callMethod("releaseSprite", callNamed("getSpriteManager"), tSprNum);
}

