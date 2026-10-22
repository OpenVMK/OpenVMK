// core.old.cct / CWindowElementWrapper / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pElemList", new LingoList([]));
  setMeProp(_me, "pPalette", symbol("systemMac"));
  setMeProp(_me, "pScaleH", symbol("fixed"));
  setMeProp(_me, "pScaleV", symbol("fixed"));
  setMeProp(_me, "pLocX", 0);
  setMeProp(_me, "pLocY", 0);
  setMeProp(_me, "pwidth", 0);
  setMeProp(_me, "pheight", 0);
  setMeProp(_me, "pVisible", 1);
  setMeProp(_me, "pUseAlpha", 0);
  return 1;
}

