// vmk_tutorial.cct / CJungleCruiseFactorPowerup / collisionNotification

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
  callMethod("SetParam", callMethod("getObject", _me), "Picked", 1)
  var tdata = new LingoList([]);
  callMethod("append", tdata, callMethod("GetParam", callMethod("getObject", _me), "Reference"))
  callNamed("executeMessage", symbol("SendMinigameAction"), 2, tdata)
  if (lingoBinary("eq", callMethod("GetParam", callMethod("getObject", _me), "Type"), symbol("film"))) {
  callMethod("playFx", callMethod("getComponent", callNamed("getThread", "junglecruise")), "power_up_5")
  }

  if (lingoBinary("eq", callMethod("GetParam", callMethod("getObject", _me), "Type"), symbol("fuel"))) {
  callMethod("playFx", callMethod("getComponent", callNamed("getThread", "junglecruise")), "power_up_6")
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_p_BoundingCircle"))) ? 0 : 1)) {
  var tID = callMethod("getID", meProp(_me, "m_p_BoundingCircle"));
  if (lingoBinary("neq", callNamed("getObject", tID), 0)) {
  callNamed("removeObject", tID)
  }

  }

  break;
case symbol("edge"):
  break;
  default:
  callNamed("put", "Powerup had an unknown collision")
  }

}

