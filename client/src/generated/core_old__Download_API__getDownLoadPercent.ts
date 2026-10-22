// core.old.cct / Download API / getDownLoadPercent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getDownLoadPercent(_me: LingoMe, tID: LingoValue) {
  return callMethod("getLoadPercent", callNamed("getDownloadManager"), tID);
}

