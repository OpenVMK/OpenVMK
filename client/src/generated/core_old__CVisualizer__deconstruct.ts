// core.old.cct / CVisualizer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  callNamed("releaseSprite", meProp(_me, "pSpriteList")[i].spriteNum)
  }

  setMeProp(_me, "pSpriteList", new LingoList([]));
  setMeProp(_me, "pSpriteData", new LingoList([]));
  setMeProp(_me, "pActSprList", new LingoPropList([]));
  setMeProp(_me, "pBoundary", new LingoList([]));
  return 1;
}

