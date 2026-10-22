// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _CancelRoomLoad

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CancelRoomLoad(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  callMethod("_CancelRoom", _this.component)
}

