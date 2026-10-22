// core.old.cct / CWindowGroupedElement / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tProp: LingoValue) {
  switch (tProp) {
case symbol("buffer"):
  return meProp(_me, "pBuffer");
case symbol("sprite"):
  return meProp(_me, "pSprite");
case symbol("width"):
  return meProp(_me, "pwidth");
case symbol("height"):
  return meProp(_me, "pheight");
case symbol("locX"):
  return meProp(_me, "pLocX");
case symbol("locY"):
  return meProp(_me, "pLocY");
case symbol("scaleH"):
  return meProp(_me, "pScaleH");
case symbol("scaleV"):
  return meProp(_me, "pScaleV");
case symbol("depth"):
  return meProp(_me, "pDepth");
case symbol("palette"):
  return meProp(_me, "pPalette");
  }

  return 0;
}

