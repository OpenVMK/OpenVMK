// core.old.cct / CMgrSprite / releaseAllSprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function releaseAllSprites(_me: LingoMe) {
  setMeProp(_me, "pFreeSprList", new LingoList([]));
  for (var tSprNum of meProp(_me, "pTotalSprList").count.toArray()) {
  callMethod("releaseSprite", _me, tSprNum)
  }

  return 1;
}

