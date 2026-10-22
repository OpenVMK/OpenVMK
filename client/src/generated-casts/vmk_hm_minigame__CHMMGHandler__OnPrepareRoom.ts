// vmk_hm_minigame.cct / CHMMGHandler / OnPrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnPrepareRoom(_me: LingoMe) {
  setMeProp(_me, "m_rGameEngine", callMethod("getComponent", callNamed("getThread", "minigame")));
  setMeProp(_me, "m_rHauntedMansionEngine", callMethod("getComponent", callNamed("getThread", "hauntedmansiongame")));
  setMeProp(_me, "m_rHauntedMansionInterface", callMethod("getInterface", callNamed("getThread", "hauntedmansiongame")));
  callMethod("PrepareRoom", meProp(_me, "m_rHauntedMansionEngine"))
  setMeProp(_me, "m_bDebugOut", 0);
}

