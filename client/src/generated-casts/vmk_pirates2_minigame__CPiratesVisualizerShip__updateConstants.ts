// vmk_pirates2_minigame.cct / CPiratesVisualizerShip / updateConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateConstants(_me: LingoMe) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  var t_iType = callNamed("integer", callMethod("GetParam", callMethod("getObject", _me), "Type"));
  if (lingoBinary("gt", t_iType, 0)) {
  if (lingoBinary("neq", meProp(_me, "m_iType"), t_iType)) {
  setMeProp(_me, "m_iType", t_iType);
  callMethod("updateShipType", _me)
  }

  }

  var t_iTeam = callNamed("integer", callMethod("GetParam", callMethod("getObject", _me), "Team"));
  if (lingoBinary("gt", t_iTeam, 1)) {
  setMeProp(_me, "m_iTeam", t_iTeam);
  callMethod("updateSailType", _me, t_iTeam)
  }

}

