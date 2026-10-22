// core.old.cct / CWindowScrollbarBACKUP / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  setThePropOf(_me.pSprite, "width", _me.pwidth);
  setThePropOf(_me.pSprite, "height", _me.pheight);
  callNamed("call", symbol("registerScroll"), new LingoList([callMethod("getElement", callNamed("getWindow", _me.pMotherId), meProp(_me, "pClientID"))]), _me.pID)
}

