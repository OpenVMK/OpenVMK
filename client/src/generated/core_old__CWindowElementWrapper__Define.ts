// core.old.cct / CWindowElementWrapper / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, _this: LingoValue, tProps: LingoValue) {
  setMeProp(_me, "pID", tProps[symbol("id")]);
  setMeProp(_me, "pBuffer", tProps[symbol("buffer")]);
  setMeProp(_me, "pSprite", tProps[symbol("sprite")]);
  setMeProp(_me, "pLocX", tProps[symbol("locX")]);
  setMeProp(_me, "pLocY", tProps[symbol("locY")]);
  setMeProp(_me, "pUseAlpha", tProps[symbol("alpha")]);
  setMeProp(_me, "pwidth", meProp(_me, "pBuffer").width);
  setMeProp(_me, "pheight", meProp(_me, "pBuffer").height);
  setMeProp(_me, "pPalette", meProp(_me, "pBuffer").paletteRef);
  return 1;
}

