// vmk_hm_lobby_handler.cct / CHMLobbyInterface / ClearInstanceList

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

