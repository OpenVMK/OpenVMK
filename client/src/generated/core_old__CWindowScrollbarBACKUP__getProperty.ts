// core.old.cct / CWindowScrollbarBACKUP / getProperty

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
  return _me.pwidth;
case symbol("height"):
  return _me.pheight;
case symbol("locH"):
  return _me.pLocX;
case symbol("locV"):
  return _me.pLocY;
case symbol("locX"):
  return _me.pLocX;
case symbol("locY"):
  return _me.pLocY;
case symbol("offset"):
  return meProp(_me, "pScrollOffset");
  }

  return 0;
}

