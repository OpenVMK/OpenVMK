// framework.dcr /  / objectp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function objectp(_me: LingoMe, _return: LingoValue) {
  if (callNamed("value", _return.solveDownloadErrorMsg)) {
  callNamed("castLib", _return.solveDownloadErrorMsg)
  }

  setThePropOf(_return, "solveDownloadErrorMsg", callNamed("spriteNum"));
  setThePropOf(_return, "oErrorType", 1);
  callNamed("cTC", 1)
}

