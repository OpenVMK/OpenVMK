// core.old.cct / CMgrSprite / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tPropID: LingoValue) {
  switch (tPropID) {
case symbol("totalSprCount"):
  return meProp(_me, "pTotalSprList").count;
case symbol("freeSprCount"):
  return meProp(_me, "pFreeSprList").count;
  }

  return 0;
}

