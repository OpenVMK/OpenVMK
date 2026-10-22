// vmk_jungle_cruise.cct / CJungleCruiseFactorRock / collisionNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function collisionNotification(_me: LingoMe, _type: LingoValue) {
  switch (_type) {
case symbol("circle"):
  var tGameEngine = callMethod("getComponent", callNamed("getThread", "minigame"));
  var tHost = callMethod("GetHostCharacter", callMethod("getComponent", callNamed("getThread", "junglecruise")));
  if ((lingoTruthy(callMethod("GetParam", callMethod("getObject", _me), "IsHit")) ? 0 : 1)) {
  callNamed("put", "collision of ship with rock")
  callMethod("SetParam", callMethod("getObject", _me), "IsHit", 1)
  var tdata = new LingoList([]);
  callNamed("executeMessage", symbol("SendMinigameAction"), 5, tdata)
  callMethod("playFx", callMethod("getComponent", callNamed("getThread", "junglecruise")), "boat-hit-2")
  callMethod("SayWatchout", tHost)
  }

  var tID = callMethod("getID", meProp(_me, "m_p_BoundingCircle"));
  if (lingoBinary("neq", callNamed("getObject", tID), 0)) {
  callNamed("removeObject", tID)
  }

  break;
case symbol("edge"):
  callNamed("put", "Rock Collided with edge, shouldnt!!")
  break;
  default:
  callNamed("put", "Rock had an unknown collision")
  }

}

