// vmk_npc_treehouse.cct / CTreehouseComponent / construct

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
  callNamed("registerMessage", symbol("pirateClimbMast"), callMethod("getID", _me), symbol("climbUpMastSlideDownRope"))
  callNamed("registerMessage", symbol("pirateClimbRope"), callMethod("getID", _me), symbol("climbUpRopeSlideDownMast"))
  callNamed("registerMessage", symbol("pirateWeave"), callMethod("getID", _me), symbol("PointSword"))
  callNamed("registerMessage", symbol("pirateSteer"), callMethod("getID", _me), symbol("steerBoat"))
  callNamed("registerMessage", symbol("pirateSpeak"), callMethod("getID", _me), symbol("lookAndSpeak"))
  callNamed("registerMessage", symbol("pirateLook"), callMethod("getID", _me), symbol("LookLeftAndRight"))
  setMeProp(_me, "m_animIDs", new LingoList([]));
  return 1;
}

