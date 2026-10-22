// core.old.cct / CCastLoadInstance / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tFile: LingoValue, tURL: LingoValue, tpreloadId: LingoValue) {
  setMeProp(_me, "pFile", tFile);
  setMeProp(_me, "pURL", tURL);
  setMeProp(_me, "pGroupId", tpreloadId);
  setMeProp(_me, "ptryCount", 1);
  return callMethod("Activate", _me);
}

