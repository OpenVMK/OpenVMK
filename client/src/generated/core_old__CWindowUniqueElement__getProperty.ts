// core.old.cct / CWindowUniqueElement / getProperty

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
case symbol("image"):
  return meProp(_me, "pImage");
case symbol("buffer"):
  return meProp(_me, "pBuffer");
case symbol("member"):
  return meProp(_me, "pBuffer");
case symbol("sprite"):
  return meProp(_me, "pSprite");
case symbol("scaleH"):
  return meProp(_me, "pScaleH");
case symbol("scaleV"):
  return meProp(_me, "pScaleV");
case symbol("locX"):
  return meProp(_me, "pLocX");
case symbol("locY"):
  return meProp(_me, "pLocY");
case symbol("locH"):
  return meProp(_me, "pLocX");
case symbol("locV"):
  return meProp(_me, "pLocY");
case symbol("locZ"):
  return meProp(_me, "pSprite").locZ;
case symbol("width"):
  return meProp(_me, "pSprite").width;
case symbol("height"):
  return meProp(_me, "pSprite").height;
case symbol("rect"):
  return meProp(_me, "pSprite").rect;
case symbol("depth"):
  return meProp(_me, "pImage").depth;
case symbol("color"):
  return meProp(_me, "pSprite").color;
case symbol("bgColor"):
  return meProp(_me, "pSprite").bgColor;
case symbol("blend"):
  return meProp(_me, "pSprite").blend;
case symbol("ink"):
  return meProp(_me, "pSprite").ink;
case symbol("palette"):
  return meProp(_me, "pPalette");
case symbol("visible"):
  return meProp(_me, "pVisible");
case symbol("cursor"):
  return meProp(_me, "pSprite").cursor;
  }

  return 0;
}

