// core.old.cct / CWindowXML / mouseUpOutSide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUpOutSide(_me: LingoMe, tNull: LingoValue, tSprID: LingoValue) {
  if (lingoBinary("contains", tSprID, "drag")) {
  callMethod("drag", _me, 0)
  }

  if (lingoBinary("contains", tSprID, "scale")) {
  callMethod("scale", _me, 0, 0)
  }

  return callMethod("redirectEvent", _me, symbol("mouseUpOutSide"), tSprID);
}

