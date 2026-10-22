// core.old.cct / CWindowXML / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, _this: LingoValue, tProps: LingoValue) {
  setMeProp(_me, "pLocX", tProps[symbol("locX")]);
  setMeProp(_me, "pLocY", tProps[symbol("locY")]);
  setMeProp(_me, "pLocZ", tProps[symbol("locZ")]);
  setMeProp(_me, "pBoundary", tProps[symbol("boundary")]);
  setMeProp(_me, "pElemClsList", tProps[symbol("elements")]);
  setMeProp(_me, "pWindowMngr", tProps[symbol("manager")]);
  return 1;
}

