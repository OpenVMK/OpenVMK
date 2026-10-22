// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAnchor / SetAbsPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAbsPos(_me: LingoMe, _this: LingoValue, a_vePos: LingoValue) {
  var t_veOff = lingoBinary("sub", a_vePos, callMethod("GetAbsPos", callMethod("GetOwner", _this)));
  callMethod("SetParam", _this, "X", callNamed("string", callNamed("integer", t_veOff.x)))
  callMethod("SetParam", _this, "Y", callNamed("string", callNamed("integer", t_veOff.y)))
  callMethod("SetParam", _this, "Z", callNamed("string", callNamed("integer", t_veOff.z)))
}

