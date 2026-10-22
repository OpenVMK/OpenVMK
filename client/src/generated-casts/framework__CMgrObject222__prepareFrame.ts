// framework.dcr / CMgrObject222 / prepareFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepareFrame(_me: LingoMe, _this: LingoValue) {
  callNamed("call", symbol("prepare"), _this.pPrepareList)
  callNamed("call", symbol("update"), _this.pUpdateList)
}

