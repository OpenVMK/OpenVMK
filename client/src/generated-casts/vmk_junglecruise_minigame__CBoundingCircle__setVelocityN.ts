// vmk_junglecruise_minigame.cct / CBoundingCircle / setVelocityN

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setVelocityN(_me: LingoMe, _x: LingoValue, _y: LingoValue) {
  setThePropOf(meProp(_me, "velocity"), "x", _x);
  setThePropOf(meProp(_me, "velocity"), "y", _y);
  setMeProp(_me, "normal", callMethod("cross", meProp(_me, "velocity"), callNamed("vector", 0, 0, -float(1))));
  callMethod("normalize", meProp(_me, "normal"))
}

