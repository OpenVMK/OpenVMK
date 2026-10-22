// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMessage / _Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Remove(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  var t_iFieldPos = callMethod("findPos", meProp(_me, "m_mp_MessageIDList"), lingoBinary("join", a_sID, "_field"));
  if (lingoBinary("gt", t_iFieldPos, 0)) {
  var t_rModReplyField = meProp(_me, "m_mp_MessageIDList")[t_iFieldPos];
  callNamed("removeCannedField", t_rModReplyField)
  callMethod("deleteAt", meProp(_me, "m_mp_MessageIDList"), t_iFieldPos)
  }

  if (callNamed("windowExists", a_sID)) {
  callNamed("removeWindow", a_sID)
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_MessageIDList"), a_sID);
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("deleteAt", meProp(_me, "m_mp_MessageIDList"), t_iPos)
  }

  }

}

