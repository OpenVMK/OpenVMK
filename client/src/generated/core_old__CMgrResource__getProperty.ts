// core.old.cct / CMgrResource / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tPropID: LingoValue) {
  switch (tPropID) {
case symbol("memberCount"):
  return callMethod("count", meProp(_me, "pAllMemNumList"));
case symbol("dynMemCount"):
  return callMethod("count", meProp(_me, "pDynMemNumList"));
  }

  return 0;
}

