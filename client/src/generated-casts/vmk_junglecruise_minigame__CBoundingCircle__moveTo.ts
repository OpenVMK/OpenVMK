// vmk_junglecruise_minigame.cct / CBoundingCircle / moveTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveTo(_me: LingoMe, vector2: LingoValue) {
  setThePropOf(meProp(_me, "origin"), "x", vector2.x);
  setThePropOf(meProp(_me, "origin"), "y", vector2.y);
}

