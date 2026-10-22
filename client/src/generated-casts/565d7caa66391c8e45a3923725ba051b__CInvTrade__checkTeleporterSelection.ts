// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / checkTeleporterSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkTeleporterSelection(_me: LingoMe, _this: LingoValue, t_rGridRenderer: LingoValue, a_mp_iRef_rItems: LingoValue, a_iOffset: LingoValue) {
  var t_iSelection = lingoBinary("add", callMethod("GetSelected", t_rGridRenderer), a_iOffset);
  var t_rSelection = callMethod("GetSelected", _this, t_rGridRenderer, a_mp_iRef_rItems, a_iOffset);
  if (lingoBinary("neq", t_rSelection.state, symbol("invalid"))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iLastTeleporterSelection"))) ? 0 : 1)) {
  callNamed("executeMessage", "teleport_unselected", meProp(_me, "m_iLastTeleporterSelection"))
  setMeProp(_me, "m_iLastTeleporterSelection", undefined);
  }

  if ((lingoTruthy(lingoBinary("eq", callMethod("getaProp", t_rSelection, symbol("param")), 0)) ? 0 : 1)) {
  var t_rParams = t_rSelection.param;
  if (callNamed("ilk", t_rParams, symbol("list"))) {
  if (lingoBinary("eq", t_rParams.count, 3)) {
  if (lingoBinary("eq", t_rParams[1], 1)) {
  callNamed("executeMessage", "teleport_selected", t_rParams[2])
  setMeProp(_me, "m_iLastTeleporterSelection", t_rParams[2]);
  }

  }

  }

  }

  callMethod("select", t_rGridRenderer, lingoBinary("sub", t_iSelection, a_iOffset))
  }

}

