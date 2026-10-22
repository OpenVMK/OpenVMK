// vmk_hm_minigame.cct / CHMMGHandler / AdvantageTimeEnds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdvantageTimeEnds(_me: LingoMe, i_iWinnerTeam: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", "[HMDBG] Door Race Advantage Time Ends")
  }

  callMethod("ShowWindow", meProp(_me, "m_rHauntedMansionInterface"), "Notice", "fight")
  var tPlayerObjects = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 3);
  for (var tPlayer of tPlayerObjects.toArray()) {
  if ((lingoTruthy(lingoBinary("eq", callMethod("GetParam", tPlayer, "Team"), i_iWinnerTeam)) ? 0 : 1)) {
  callMethod("undelayed", callMethod("GetVisual", tPlayer))
  }

  }

}

