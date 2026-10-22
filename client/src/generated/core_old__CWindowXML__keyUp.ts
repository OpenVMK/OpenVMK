// core.old.cct / CWindowXML / keyUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function keyUp(_me: LingoMe, tNull: LingoValue, tSprID: LingoValue) {
  return callMethod("redirectEvent", _me, symbol("keyUp"), tSprID);
}

