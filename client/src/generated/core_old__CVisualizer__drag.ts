// core.old.cct / CVisualizer / drag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function drag(_me: LingoMe, tBoolean: LingoValue) {
  if (lingoBinary("and", lingoBinary("eq", tBoolean, 1), lingoBinary("eq", meProp(_me, "pDragFlag"), 0))) {
  setMeProp(_me, "pDragOffset", lingoBinary("sub", theProperty("mouseLoc"), new LingoList([meProp(_me, "pLocX"), meProp(_me, "pLocY")])));
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "pDragFlag", 1);
  } else {
  if (lingoBinary("and", lingoBinary("eq", tBoolean, 0), lingoBinary("eq", meProp(_me, "pDragFlag"), 1))) {
  callNamed("removeUpdate", callMethod("getID", _me))
  setMeProp(_me, "pDragFlag", 0);
  }

  }

  return 1;
}

