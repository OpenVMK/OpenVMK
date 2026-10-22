// vmk_pirates_game.cct / CMap / SetMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMap(_me: LingoMe, a_ar_ar_map: LingoValue) {
  setMeProp(_me, "m_map", callMethod("duplicate", a_ar_ar_map));
}

