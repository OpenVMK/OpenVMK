// core.old.cct / CWindowXML / moveX

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveX(_me: LingoMe, _this: LingoValue, a_iOffX: LingoValue) {
  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  setThePropOf(meProp(_me, "pSpriteList")[i], "locH", lingoBinary("add", meProp(_me, "pSpriteList")[i].locH, a_iOffX));
  }

}

