// vmk_jungle_cruise.cct / CBoundingCircle / draw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function draw(_me: LingoMe, g: LingoValue) {
  callMethod("setColor", g, meProp(_me, "clr"))
  callMethod("drawCircle", g, meProp(_me, "origin").x, meProp(_me, "origin").y, meProp(_me, "radius"))
}

