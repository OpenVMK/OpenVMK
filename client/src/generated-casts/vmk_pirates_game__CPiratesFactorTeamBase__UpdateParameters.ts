// vmk_pirates_game.cct / CPiratesFactorTeamBase / UpdateParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateParameters(_me: LingoMe, i_ar_data: LingoValue) {
  if (lingoBinary("eq", callMethod("GetParam", callMethod("getObject", _me), "GameParams")[1], 0)) {
  setMeProp(_me, "m_carryingFlag", 0);
  } else {
  setMeProp(_me, "m_carryingFlag", 1);
  }

}

