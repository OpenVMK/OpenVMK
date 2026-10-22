// item_2355.cct / CCheckersGameEngine / GetPlayerDataByIndex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetPlayerDataByIndex(_me: LingoMe, _this: LingoValue, a_iIndex: LingoValue) {
  for (var t_rPlayer of meProp(_me, "m_rPlayers").toArray()) {
  if (lingoBinary("eq", t_rPlayer.index, a_iIndex)) {
  return t_rPlayer;
  break;
  }

  }

  return undefined;
}

