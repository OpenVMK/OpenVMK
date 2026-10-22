// core.old.cct / CVisualizerXML / moveXY

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveXY(_me: LingoMe, tOffX: LingoValue, tOffY: LingoValue) {
  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  setThePropOf(meProp(_me, "pSpriteList")[i], "loc", lingoBinary("add", meProp(_me, "pSpriteList")[i].loc, new LingoList([tOffX, tOffY])));
  }

}

