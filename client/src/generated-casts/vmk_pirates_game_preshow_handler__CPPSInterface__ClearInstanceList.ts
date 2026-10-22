// vmk_pirates_game_preshow_handler.cct / CPPSInterface / ClearInstanceList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearInstanceList(_me: LingoMe) {
  setMeProp(_me, "m_ar_instances", new LingoList([]));
}

