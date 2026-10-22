// minigame_engine_overrides.cct /  / turnDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function turnDone(_me: LingoMe) {
  var tPulse = lingoBinary("mul", _me.m_fTurnPulse, lingoBinary("div", float(1), _me.m_iSpeedUp));
  return lingoBinary("or", lingoBinary("gte", _me.m_fTurnT, tPulse), callNamed("voidp", _me.m_rCurrentTurn));
}

