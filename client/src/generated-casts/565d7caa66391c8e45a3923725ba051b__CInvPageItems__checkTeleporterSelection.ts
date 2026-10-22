// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageItems / checkTeleporterSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkTeleporterSelection(_me: LingoMe, _this: LingoValue) {
  var t_rSelection = callMethod("GetSelected", _this);
  if (lingoBinary("neq", t_rSelection.state, symbol("invalid"))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iLastTeleporterSelection"))) ? 0 : 1)) {
  callNamed("executeMessage", "teleport_unselected", meProp(_me, "m_iLastTeleporterSelection"))
  setMeProp(_me, "m_iLastTeleporterSelection", undefined);
  }

  if ((lingoTruthy(lingoBinary("eq", callMethod("getaProp", t_rSelection, symbol("param")), 0)) ? 0 : 1)) {
  var tParams = t_rSelection.param;
  if (callNamed("ilk", tParams, symbol("list"))) {
  if (lingoBinary("eq", tParams.count, 3)) {
  if (lingoBinary("eq", tParams[1], 1)) {
  callNamed("executeMessage", "teleport_selected", tParams[2])
  setMeProp(_me, "m_iLastTeleporterSelection", tParams[2]);
  }

  }

  }

  }

  callMethod("select", meProp(_me, "m_rGridRenderer"), callMethod("GetSelected", meProp(_me, "m_rGridRenderer")))
  }

}

