// vmk_tutorial.cct / CBoundingCircle / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, _x: LingoValue, _y: LingoValue, _r: LingoValue) {
  setMeProp(_me, "origin", callNamed("vector", _x, _y, 0));
  setMeProp(_me, "radius", _r);
  if (meProp(_me, "m_bVisualizeBoundary")) {
  setMeProp(_me, "m_pSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  callMethod("visualize", _me)
  }

  return _me;
}

