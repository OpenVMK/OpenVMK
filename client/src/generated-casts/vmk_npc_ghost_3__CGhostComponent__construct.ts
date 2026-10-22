// vmk_npc_ghost_3.cct / CGhostComponent / construct

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
  callNamed("registerMessage", symbol("ghostStayHidden"), callMethod("getID", _me), symbol("StayHidden"))
  callNamed("registerMessage", symbol("ghostAppear"), callMethod("getID", _me), symbol("Appear"))
  callNamed("registerMessage", symbol("ghostIdle"), callMethod("getID", _me), symbol("idle"))
  callNamed("registerMessage", symbol("ghostSpeak"), callMethod("getID", _me), symbol("speak"))
  callNamed("registerMessage", symbol("ghostDisAppear"), callMethod("getID", _me), symbol("DisAppear"))
  setMeProp(_me, "m_animIDs", new LingoList([]));
  setMeProp(_me, "m_hidden", 1);
  return 1;
}

