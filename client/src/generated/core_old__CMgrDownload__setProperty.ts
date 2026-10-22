// core.old.cct / CMgrDownload / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, tPropID: LingoValue, tvalue: LingoValue) {
  switch (tPropID) {
case symbol("defaultURL"):
  return callMethod("setDefaultURL", _me, tvalue);
  }

  return 0;
}

