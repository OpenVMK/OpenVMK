// vmk_pirates_game.cct / CMap / SetMapAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMapAt(_me: LingoMe, i_x: LingoValue, i_y: LingoValue, i_value: LingoValue) {
  meProp(_me, "m_map")[i_y][i_x] = i_value;
}

