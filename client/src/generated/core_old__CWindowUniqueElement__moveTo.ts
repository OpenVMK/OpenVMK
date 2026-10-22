// core.old.cct / CWindowUniqueElement / moveTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveTo(_me: LingoMe, tLocX: LingoValue, tLocY: LingoValue) {
  var tOffX = lingoBinary("sub", tLocX, meProp(_me, "pLocX"));
  var tOffY = lingoBinary("sub", tLocY, meProp(_me, "pLocY"));
  setMeProp(_me, "pLocX", tLocX);
  setMeProp(_me, "pLocY", tLocY);
  setThePropOf(meProp(_me, "pSprite"), "loc", lingoBinary("add", meProp(_me, "pSprite").loc, new LingoList([tOffX, tOffY])));
}

