// core.old.cct / Special Services API / printMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function printMsg(_me: LingoMe, a_rObj: LingoValue, a_sMsg: LingoValue) {
  callMethod("print", callNamed("getSpecialServices"), a_rObj, a_sMsg)
}

