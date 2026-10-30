// vmk_shrinking_room_handler.cct (Disney's file, archived as vmk_grotto_handler.cct) / CNautilusGrottoComponent / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe) {
  setMeProp(_me, "m_bReady", 1);
  callMethod("HandleGate", _me, 0)
}

