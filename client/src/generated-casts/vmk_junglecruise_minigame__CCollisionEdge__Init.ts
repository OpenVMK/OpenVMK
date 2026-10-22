// vmk_junglecruise_minigame.cct / CCollisionEdge / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, _x1: LingoValue, _y1: LingoValue, _x2: LingoValue, _y2: LingoValue) {
  setMeProp(_me, "origin", callNamed("vector", _x1, _y1, 0));
  setMeProp(_me, "direction", callNamed("vector", _x2, _y2, 0));
  setMeProp(_me, "normal", callMethod("cross", meProp(_me, "direction"), callNamed("vector", 0, 0, -float(1))));
  callMethod("normalize", meProp(_me, "normal"))
}

