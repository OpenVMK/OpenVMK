// core.old.cct / Sprite API / reserveSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reserveSprite(_me: LingoMe, tClientID: LingoValue) {
  return callMethod("reserveSprite", callNamed("getSpriteManager"), tClientID);
}

