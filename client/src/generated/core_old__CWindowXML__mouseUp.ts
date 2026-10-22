// core.old.cct / CWindowXML / mouseUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUp(_me: LingoMe, tNull: LingoValue, tSprID: LingoValue) {
  if (lingoBinary("neq", callMethod("getPos", meProp(_me, "pSpecialIDList"), tSprID), 0)) {
  if (lingoBinary("contains", tSprID, "drag")) {
  callMethod("drag", _me, 0)
  } else {
  if (lingoBinary("contains", tSprID, "scale")) {
  callMethod("scale", _me, 0, 0)
  } else {
  if (lingoBinary("contains", tSprID, "close")) {
  if (callNamed("voidp", meProp(_me, "pClientID"))) {
  return callMethod("Remove", meProp(_me, "pWindowMngr"), callMethod("getID", _me));
  } else {
  tSprID = "close";
  }

  }

  }

  }

  }

  return callMethod("redirectEvent", _me, symbol("mouseUp"), tSprID);
}

