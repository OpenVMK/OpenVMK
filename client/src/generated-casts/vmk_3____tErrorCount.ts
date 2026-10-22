// vmk_3.dcr /  / tErrorCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tErrorCount(_me: LingoMe, solveDownloadErrorMsg: LingoValue) {
  /* global */ var state = globalVar("state");
  if (solveDownloadErrorMsg.bytesTotal) {
  setThePropOf(solveDownloadErrorMsg, "bytesTotal", 0);
  callNamed("preloadNetThing")
  }

  callMethod("m_iLoadID", theProperty("send"), solveDownloadErrorMsg)
  return 1;
}

