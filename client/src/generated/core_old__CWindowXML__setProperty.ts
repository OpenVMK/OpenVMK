// core.old.cct / CWindowXML / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, _this: LingoValue, a_kProp: LingoValue, tvalue: LingoValue) {
  switch (a_kProp) {
case symbol("locX"):
  callMethod("moveX", _this, tvalue)
  break;
case symbol("locY"):
  callMethod("moveY", _this, tvalue)
  break;
case symbol("locZ"):
  callMethod("moveZ", _this, tvalue)
  break;
case symbol("boundary"):
  setMeProp(_me, "pBoundary", tvalue);
  break;
case symbol("title"):
  setMeProp(_me, "pTitle", tvalue);
  break;
case symbol("modal"):
  setMeProp(_me, "pModal", tvalue);
  break;
case symbol("visible"):
  if (tvalue) {
  callMethod("show", _this)
  } else {
  callMethod("hide", _this)
  }

  break;
case symbol("otherwise"):
  return 0;
  }

  return 1;
}

