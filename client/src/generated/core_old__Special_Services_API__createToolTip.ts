// core.old.cct / Special Services API / createToolTip

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createToolTip(_me: LingoMe, a_sText: LingoValue) {
  return callMethod("createToolTip", callNamed("getSpecialServices"), a_sText);
}

