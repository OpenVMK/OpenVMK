// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / _RemoveAvatarCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemoveAvatarCbk(_me: LingoMe, _this: LingoValue, a_rData: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rSelected"))) {
  if (lingoBinary("eq", callMethod("getaProp", a_rData, symbol("avatar")), callNamed("integer", callMethod("GetParam", meProp(_me, "m_rSelected"), "REF")))) {
  callMethod("Unselect", _this)
  }

  }

}

