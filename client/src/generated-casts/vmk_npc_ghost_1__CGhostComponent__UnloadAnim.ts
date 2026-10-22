// vmk_npc_ghost_1.cct / CGhostComponent / UnloadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnloadAnim(_me: LingoMe) {
  callNamed("put", lingoBinary("joinPad", "UnloadAnim", _me))
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  for (var i = 1; i <= meProp(_me, "m_animIDs").count; ++i) {
  callMethod("RemoveAnim", tAnimEngine, meProp(_me, "m_animIDs")[i])
  }

  }

}

