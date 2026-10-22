// core.old.cct / CWindowPatternWrapper / draw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function draw(_me: LingoMe) {
  callMethod("draw", _me.pBuffer.image, callNamed("rect", _me.pLocX, _me.pLocY, lingoBinary("add", _me.pLocX, _me.pwidth), lingoBinary("add", _me.pLocY, _me.pheight)), new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", 255, 0, 128)]))
}

