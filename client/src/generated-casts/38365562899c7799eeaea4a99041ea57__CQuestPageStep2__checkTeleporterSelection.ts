// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / checkTeleporterSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkTeleporterSelection(_me: LingoMe) {
  var tSelection = callMethod("GetSelected", _me);
  if (lingoBinary("neq", tSelection.state, symbol("invalid"))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iLastTeleporterSelection"))) ? 0 : 1)) {
  callMethod("TeleportUnSelected", _me, meProp(_me, "m_iLastTeleporterSelection"))
  setMeProp(_me, "m_iLastTeleporterSelection", undefined);
  }

  if ((lingoTruthy(lingoBinary("eq", callMethod("getaProp", tSelection, symbol("param")), 0)) ? 0 : 1)) {
  var tParams = tSelection.param;
  if (callNamed("ilk", tParams, symbol("list"))) {
  if (lingoBinary("eq", tParams.count, 3)) {
  if (lingoBinary("eq", tParams[1], 1)) {
  callMethod("TeleportSelected", _me, tParams[2])
  setMeProp(_me, "m_iLastTeleporterSelection", tParams[2]);
  }

  }

  }

  }

  callMethod("select", meProp(_me, "m_rGridRenderer"), meProp(_me, "m_rGridRenderer").m_iSelected)
  }

}

