// vmk_npc_emporium.cct / CNPCEsmeraldaComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("LoadAnim"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("UnloadAnim"))
  callNamed("registerMessage", symbol("levitate"), callMethod("getID", _me), symbol("levitateEsmeralda"))
  callNamed("registerMessage", symbol("animation_ready"), callMethod("getID", _me), symbol("animationFinished"))
  setMeProp(_me, "m_animIDs", new LingoList([]));
  return 1;
}

