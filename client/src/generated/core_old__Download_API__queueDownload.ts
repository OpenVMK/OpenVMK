// core.old.cct / Download API / queueDownload

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function queueDownload(_me: LingoMe, tURL: LingoValue, tMemName: LingoValue, tFileType: LingoValue, tForceFlag: LingoValue) {
  return callMethod("queue", callNamed("getDownloadManager"), tURL, tMemName, tFileType, tForceFlag);
}

