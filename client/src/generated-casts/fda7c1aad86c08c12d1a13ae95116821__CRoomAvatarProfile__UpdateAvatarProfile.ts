// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / UpdateAvatarProfile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateAvatarProfile(_me: LingoMe, a_mp_DataList: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSelected"))) ? 0 : 1)) {
  if (lingoBinary("gt", callMethod("findPos", a_mp_DataList, symbol("avatar")), 0)) {
  if (lingoBinary("eq", callMethod("GetParam", a_mp_DataList[symbol("avatar")], "NAME"), callMethod("GetParam", meProp(_me, "m_rSelected"), "NAME"))) {
  callMethod("select", _me, meProp(_me, "m_rSelected"))
  }

  }

  }

}

