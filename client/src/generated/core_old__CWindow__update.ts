// core.old.cct / CWindow / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  callMethod("moveTo", _this, lingoBinary("sub", theProperty("mouseH"), meProp(_me, "pDragOffset")[1]), lingoBinary("sub", theProperty("mouseV"), meProp(_me, "pDragOffset")[2]))
}

