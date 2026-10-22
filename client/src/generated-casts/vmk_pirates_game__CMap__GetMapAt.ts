// vmk_pirates_game.cct / CMap / GetMapAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetMapAt(_me: LingoMe, i_iX: LingoValue, i_iY: LingoValue) {
  if (lingoBinary("and", lingoBinary("gte", i_iY, 1), lingoBinary("lte", i_iY, meProp(_me, "m_map").count))) {
  if (lingoBinary("and", lingoBinary("gte", i_iX, 1), lingoBinary("lte", i_iX, meProp(_me, "m_map")[i_iY].count))) {
  return meProp(_me, "m_map")[i_iY][i_iX];
  }

  }

  return 3;
}

