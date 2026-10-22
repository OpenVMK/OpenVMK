// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomContext / _CreateIndexed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateIndexed(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue, a_sCls: LingoValue, a_rXML: LingoValue) {
  if (lingoBinary("neq", callNamed("integer", callMethod("GetParam", a_rXML, "REF")), a_iRef)) {
  callNamed("error", _this, "Mismatching identifier!", symbol("_CreateIndexed"))
  callMethod("SetParam", a_rXML, "REF", callNamed("string", a_iRef))
  }

  if (lingoBinary("neq", callMethod("GetParam", a_rXML, "CLASS"), a_sCls)) {
  callNamed("error", _this, "Mismatching class!", symbol("_CreateIndexed"))
  callMethod("SetParam", a_rXML, "CLASS", a_sCls)
  }

  return callMethod("create", _this, callMethod("createKey", _this), a_rXML);
}

