// vmk_hm_minigame.cct / CHMMGHandler / OnEndStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEndStage(_me: LingoMe, i_iTime: LingoValue, i_ar_params: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Stage End", i_iTime), i_ar_params))
  }

  callMethod("removeRattlers", callMethod("getComponent", callNamed("getThread", "hauntedmansiongame")).m_rStage)
  var tScoreBoard = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 5);
  if (lingoBinary("neq", tScoreBoard.count, 1)) {
  return callNamed("error", _me, "HM Scoreboard object could not be found!", symbol("OnEndStage"));
  }

  callMethod("TeamWins", callMethod("GetFactor", tScoreBoard[1]), i_ar_params[1])
  callMethod("removeAllDoors", meProp(_me, "m_rHauntedMansionEngine"))
  callMethod("setChattable", callMethod("HMGGetWindow", meProp(_me, "m_rHauntedMansionInterface"), "UI"), 0)
  callMethod("SetRoundResults", meProp(_me, "m_rHauntedMansionInterface"), i_ar_params)
  callMethod("ShowWindow", meProp(_me, "m_rHauntedMansionInterface"), "Results")
  callMethod("stopAction", meProp(_me, "m_rHauntedMansionInterface"))
}

