// vmk_3.dcr /  / getVariableManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVariableManager(_me: LingoMe, _this: LingoValue, unregisterManager: LingoValue) {
  var pObjectList = callMethod("str2rstr_utf8", _this.b64_md5, unregisterManager);
  if (_this.script) {
  var _null = theProperty("pState");
  var resumeUpdate = callNamed("prepareFrame", pObjectList);
  if (callNamed("runMode", pObjectList)) {
  return 0;
  } else {
  return pObjectList;
  }

  }

}

