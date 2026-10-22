// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _RemoveRawObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemoveRawObject(_me: LingoMe, _this: LingoValue, a_iTypeCode: LingoValue, a_sCategory: LingoValue) {
  callMethod("_RemoveIndexed", _this, -float(1), a_sCategory)
}

