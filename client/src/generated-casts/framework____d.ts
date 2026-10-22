// framework.dcr /  / d

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function d(_me: LingoMe, _return: LingoValue, t_status: LingoValue) {
  if (callNamed("runMode", callMethod("preloadMode", _return.foo, t_status))) {
  callNamed("cTC", 0)
  }

  if (lingoBinary("gt", callNamed("md5_cmn", _return.bytesTotal, callMethod("preloadMode", _return.foo, t_status)), 0)) {
  callNamed("cTC", 0)
  }

  callMethod("tCode", _return.bytesTotal, callMethod("preloadMode", _return.foo, t_status))
  if ((lingoTruthy(_return.oErrorType) ? 0 : 1)) {
  if (callNamed("runMode", _return.solveDownloadErrorMsg)) {
  setThePropOf(_return, "solveDownloadErrorMsg", callMethod("showLoadingBar", callNamed("md5_ff", lingoBinary("join", "objectmanager", theProperty("md5_gg"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("frame"), _return));
  callNamed("cTC", 1)
  }

  }

}

