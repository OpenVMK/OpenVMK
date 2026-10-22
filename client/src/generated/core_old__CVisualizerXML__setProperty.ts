// core.old.cct / CVisualizerXML / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, tProp: LingoValue, tvalue: LingoValue) {
  switch (tProp) {
case symbol("layout"):
  return callMethod("open", _me, tvalue);
case symbol("locX"):
  return callMethod("moveX", _me, tvalue);
case symbol("locY"):
  return callMethod("moveY", _me, tvalue);
case symbol("locZ"):
  return callMethod("moveZ", _me, tvalue);
case symbol("boundary"):
  setMeProp(_me, "pBoundary", tvalue);
  return 1;
case symbol("visible"):
  if (tvalue) {
  return callMethod("show", _me);
  } else {
  return callMethod("hide", _me);
  }

  break;
case symbol("title"):
  setMeProp(_me, "pTitle", tvalue);
  return 1;
  }

  return 0;
}

