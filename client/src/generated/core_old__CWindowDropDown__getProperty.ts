// core.old.cct / CWindowDropDown / getProperty

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
case symbol("width"):
  return _me.pSprite.width;
case symbol("height"):
  return _me.pSprite.height;
case symbol("locX"):
  return _me.pLocX;
case symbol("locY"):
  return _me.pLocY;
case symbol("depth"):
  return _me.pImage.depth;
case symbol("blend"):
  return _me.pSprite.blend;
case symbol("selection"):
  return meProp(_me, "pTextKeys")[meProp(_me, "pSelectedItemNum")];
  }

  return 0;
}

