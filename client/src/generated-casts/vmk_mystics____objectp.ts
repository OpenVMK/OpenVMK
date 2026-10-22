// vmk_mystics.cct /  / objectp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function objectp(_me: LingoMe, _AccessIndexed: LingoValue, voidp: LingoValue) {
  setThePropOf(_AccessIndexed, "this", voidp);
}

