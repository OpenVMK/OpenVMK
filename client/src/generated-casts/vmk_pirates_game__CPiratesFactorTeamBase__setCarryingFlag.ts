// vmk_pirates_game.cct / CPiratesFactorTeamBase / setCarryingFlag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCarryingFlag(_me: LingoMe, a_bFlagOnShip: LingoValue) {
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  if (a_bFlagOnShip) {
  setMeProp(_me, "m_carryingFlag", 1);
  } else {
  setMeProp(_me, "m_carryingFlag", 0);
  }

}

