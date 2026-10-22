// framework.dcr / CMgrObject222 / resumeUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resumeUpdate(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", _this.pUpdateList.count, 0), callNamed("voidp", _this.pTimeOut))) {
  setThePropOf(_this, "pTimeOut", callMethod("new", callNamed("timeout", lingoBinary("join", "objectmanager", theProperty("milliSeconds"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("null"), _this));
  setThePropOf(_this, "pUpdatePause", 0);
  return 1;
  }

}

