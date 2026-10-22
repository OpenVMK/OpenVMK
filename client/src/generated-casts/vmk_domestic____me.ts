// vmk_domestic.cct /  / me

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _me(_me: LingoMe, getComponent: LingoValue, CreateSprites: LingoValue) {
  callNamed("_AccessIndexed", symbol("me"), getComponent, CreateSprites)
  setMeProp(_me, "Search", callMethod("GetVisual", CreateSprites));
}

