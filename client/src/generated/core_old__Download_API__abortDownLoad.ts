// core.old.cct / Download API / abortDownLoad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function abortDownLoad(_me: LingoMe, tMemNameOrNum: LingoValue) {
  return callMethod("abort", callNamed("getDownloadManager"), tMemNameOrNum);
}

