// vmk_npc_ghost_3.cct / CGhostInterface / warpToSpot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function warpToSpot(_me: LingoMe) {
  setMeProp(_me, "m_npcMoveMode", symbol("warp"));
}

