// vmk_npc_gatorwaiter.cct / CGatorWaiterInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bWalking", 0);
  setMeProp(_me, "m_npcSprite", undefined);
  setMeProp(_me, "m_bInitialized", 0);
  setMeProp(_me, "m_sMarkerName", "");
  return 1;
}

