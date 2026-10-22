// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAnchor / SetRelPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRelPos(_me: LingoMe, _this: LingoValue, a_vePos: LingoValue) {
  callMethod("SetParam", _this, "X", callNamed("string", callNamed("integer", a_vePos.x)))
  callMethod("SetParam", _this, "Y", callNamed("string", callNamed("integer", a_vePos.y)))
  callMethod("SetParam", _this, "Z", callNamed("string", callNamed("integer", a_vePos.z)))
}

