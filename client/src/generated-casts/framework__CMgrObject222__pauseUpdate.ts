// framework.dcr / CMgrObject222 / pauseUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pauseUpdate(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", _this.pTimeOut)) {
  callNamed("forget", _this.pTimeOut)
  }

  setThePropOf(_this, "pTimeOut", undefined);
  setThePropOf(_this, "pUpdatePause", 1);
  return 1;
}

