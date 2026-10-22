// core.old.cct / Download API / registerDownloadCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerDownloadCallback(_me: LingoMe, tMemNameOrNum: LingoValue, tMethod: LingoValue, tClientID: LingoValue, tArgument: LingoValue) {
  return callMethod("registerCallback", callNamed("getDownloadManager"), tMemNameOrNum, tMethod, tClientID, tArgument);
}

