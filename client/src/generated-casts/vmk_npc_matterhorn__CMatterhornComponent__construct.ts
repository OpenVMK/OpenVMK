// vmk_npc_matterhorn.cct / CMatterhornComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bReady", 0);
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("LoadAnim"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("UnloadAnim"))
  callNamed("registerMessage", symbol("room_animations_ready"), callMethod("getID", _me), symbol("Init"))
  callNamed("registerMessage", symbol("yetiRoar"), callMethod("getID", _me), symbol("RoarAndSpeak"))
  callNamed("registerMessage", symbol("yetiIdle"), callMethod("getID", _me), symbol("idle"))
  callNamed("registerMessage", symbol("yetiPhone"), callMethod("getID", _me), symbol("AnswerPhone"))
  callNamed("registerMessage", symbol("yetiSnowball"), callMethod("getID", _me), symbol("ThrowSnowball"))
  return 1;
}

