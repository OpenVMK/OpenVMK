// core.old.cct / Special Services API / openNetPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openNetPage(_me: LingoMe, a_sURL_key: LingoValue) {
  return callMethod("openNetPage", callNamed("getSpecialServices"), a_sURL_key);
}

