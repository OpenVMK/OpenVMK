// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObject / GetContext

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetContext(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", callMethod("GetOwner", _this))) {
  return callMethod("GetContext", callMethod("GetOwner", _this));
  }

}

