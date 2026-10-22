// vmk_pirates2_minigame.cct / CMap / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_map", new LingoList([]));
  setMeProp(_me, "m_tilesize", 1);
  setMeProp(_me, "m_offset", callNamed("point", 0, 0));
  return 1;
}

