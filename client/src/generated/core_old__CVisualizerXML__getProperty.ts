// core.old.cct / CVisualizerXML / getProperty

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
case symbol("layout"):
  return meProp(_me, "pLayout");
case symbol("locX"):
  return meProp(_me, "pLocX");
case symbol("locY"):
  return meProp(_me, "pLocY");
case symbol("locZ"):
  return meProp(_me, "pLocZ");
case symbol("boundary"):
  return meProp(_me, "pBoundary");
case symbol("width"):
  return meProp(_me, "pwidth");
case symbol("height"):
  return meProp(_me, "pheight");
case symbol("sprCount"):
  return meProp(_me, "pSpriteList").count;
case symbol("spriteList"):
  return meProp(_me, "pSpriteList");
case symbol("spriteData"):
  return meProp(_me, "pSpriteData");
case symbol("visible"):
  return meProp(_me, "pVisible");
case symbol("title"):
  return meProp(_me, "pTitle");
case symbol("id"):
  return callMethod("getID", _me);
  }

  return 0;
}

