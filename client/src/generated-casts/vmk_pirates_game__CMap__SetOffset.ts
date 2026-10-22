// vmk_pirates_game.cct / CMap / SetOffset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOffset(_me: LingoMe, i_offsetX: LingoValue, i_offsetY: LingoValue) {
  setMeProp(_me, "m_offset", callNamed("point", i_offsetX, i_offsetY));
}

