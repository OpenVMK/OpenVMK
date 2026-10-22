// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pLineHeight", 21);
  setThePropOf(_me, "Caption", "MENU ITEM");
  setMeProp(_me, "pColors", new LingoPropList([]));
  setThePropOf(_me, "Active", 0);
  callMethod("update", _me)
  setMeProp(_me, "pNeedUpdate", 1);
  setMeProp(_me, "pImg", callNamed("image", 100, meProp(_me, "pLineHeight"), 32));
  return 1;
}

