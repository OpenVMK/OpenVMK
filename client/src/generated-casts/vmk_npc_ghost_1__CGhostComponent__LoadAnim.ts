// vmk_npc_ghost_1.cct / CGhostComponent / LoadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAnim(_me: LingoMe) {
  callNamed("put", lingoBinary("joinPad", "LoadAnim", _me))
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  meProp(_me, "m_animIDs")[1] = callMethod("LoadAnim", tAnimEngine, "ghost_invisible_arrangement");
  meProp(_me, "m_animIDs")[2] = callMethod("LoadAnim", tAnimEngine, "ghost_appear_arrangement");
  meProp(_me, "m_animIDs")[3] = callMethod("LoadAnim", tAnimEngine, "ghost_idle_arrangement");
  meProp(_me, "m_animIDs")[4] = callMethod("LoadAnim", tAnimEngine, "ghost_speak_arrangement");
  meProp(_me, "m_animIDs")[5] = callMethod("LoadAnim", tAnimEngine, "ghost_disappear_arrangement");
  }

}

