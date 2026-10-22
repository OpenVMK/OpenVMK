// minigame_engine_potc2.cct / CGameComponent / turnDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function turnDone(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  var tPulse = lingoBinary("mul", meProp(_me, "m_fTurnPulse"), lingoBinary("div", float(1), meProp(_me, "m_iSpeedUp")));
  return lingoBinary("or", lingoBinary("gte", meProp(_me, "m_fTurnT"), tPulse), callNamed("voidp", meProp(_me, "m_rCurrentTurn")));
}

