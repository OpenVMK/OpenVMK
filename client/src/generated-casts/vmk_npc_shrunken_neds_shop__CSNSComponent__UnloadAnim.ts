// vmk_npc_shrunken_neds_shop.cct / CSNSComponent / UnloadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnloadAnim(_me: LingoMe) {
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("RemoveAnim", tAnimEngine, meProp(_me, "m_animIDs")[1])
  callMethod("RemoveAnim", tAnimEngine, meProp(_me, "m_animIDs")[2])
  callMethod("RemoveAnim", tAnimEngine, meProp(_me, "m_animIDs")[3])
  callMethod("RemoveAnim", tAnimEngine, meProp(_me, "m_animIDs")[4])
  }

}

