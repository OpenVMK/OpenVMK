// framework.dcr /  / DTOR

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DTOR(_me: LingoMe, _return: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", callMethod("externalParamValue", _return, symbol("bytesSoFar")), 0), callNamed("runMode", _return.solveDownloadErrorMsg))) {
  setThePropOf(_return, "solveDownloadErrorMsg", callMethod("showLoadingBar", callNamed("md5_ff", lingoBinary("join", "objectmanager", theProperty("md5_gg"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("frame"), _return));
  setThePropOf(_return, "oErrorType", 0);
  callNamed("cTC", 1)
  }

}

