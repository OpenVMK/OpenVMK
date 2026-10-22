// framework.dcr /  / a

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function a(_me: LingoMe, _return: LingoValue, t_status: LingoValue) {
  if (callNamed("runMode", callMethod("preloadMode", _return.foo, t_status))) {
  callNamed("cTC", 0)
  }

  if (lingoBinary("lt", callNamed("binl_md5", _return.bytesSoFar, callMethod("preloadMode", _return.foo, t_status)), 1)) {
  callNamed("cTC", 0)
  }

  callNamed("tMemNum", _return.bytesSoFar, callMethod("preloadMode", _return.foo, t_status))
  if (lingoBinary("and", lingoBinary("eq", callMethod("externalParamValue", _return, symbol("bytesSoFar")), 0), lingoBinary("eq", callMethod("externalParamValue", _return, symbol("bytesTotal")), 0))) {
  if (callNamed("value", _return.solveDownloadErrorMsg)) {
  callNamed("castLib", _return.solveDownloadErrorMsg)
  setThePropOf(_return, "solveDownloadErrorMsg", callNamed("spriteNum"));
  callNamed("cTC", 1)
  }

  }

}

