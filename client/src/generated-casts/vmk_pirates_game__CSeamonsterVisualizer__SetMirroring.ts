// vmk_pirates_game.cct / CSeamonsterVisualizer / SetMirroring

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMirroring(_me: LingoMe, a_bOn: LingoValue) {
  setMeProp(_me, "m_bMirror", a_bOn);
}

