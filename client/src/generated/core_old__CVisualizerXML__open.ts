// core.old.cct / CVisualizerXML / open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function open(_me: LingoMe, tLayout: LingoValue) {
  if (callNamed("voidp", tLayout)) {
  tLayout = meProp(_me, "pLayout");
  }

  setMeProp(_me, "pLayout", tLayout);
  if (lingoBinary("gt", meProp(_me, "pSpriteList").count, 0)) {
  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  callNamed("releaseSprite", meProp(_me, "pSpriteList")[i].spriteNum)
  }

  setMeProp(_me, "pSpriteList", new LingoList([]));
  }

  return callMethod("buildVisual", _me, meProp(_me, "pLayout"));
}

