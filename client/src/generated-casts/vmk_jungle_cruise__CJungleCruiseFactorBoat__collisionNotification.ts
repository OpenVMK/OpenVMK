// vmk_jungle_cruise.cct / CJungleCruiseFactorBoat / collisionNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function collisionNotification(_me: LingoMe, _type: LingoValue, _collisionType: LingoValue, _collisionObject: LingoValue) {
  var t_bResponse = 1;
  var tSpeed = callMethod("length", meProp(_me, "m_p_BoundingCircles")[1].velocity);
  switch (_type) {
case symbol("circle"):
  if (lingoBinary("eq", callMethod("GetType", _collisionObject), symbol("nobody"))) {
  t_bResponse = 0;
  }

  break;
case symbol("edge"):
  var t_sEdgeName = callMethod("GetName", _collisionObject);
  if (lingoBinary("contains", t_sEdgeName, "boundary")) {
  switch (t_sEdgeName) {
case "boundary_3":
case "boundary_2":
  callMethod("SetParam", callMethod("getObject", _me), "StageOver", 1)
  t_bResponse = 0;
  break;
  break;
  }

  }

  if (lingoBinary("gt", tSpeed, 3.5)) {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_lastCollision")), lingoBinary("mul", meProp(_me, "m_collMinDT"), 1000))) {
  setMeProp(_me, "m_lastCollision", theProperty("milliSeconds"));
  } else {
  t_bResponse = 0;
  }

  } else {
  t_bResponse = 0;
  }

  break;
  }

  if (t_bResponse) {
  var tHost = callMethod("GetHostCharacter", callMethod("getComponent", callNamed("getThread", "junglecruise")));
  callMethod("playFx", callMethod("getComponent", callNamed("getThread", "junglecruise")), "JC-crash")
  callMethod("SayWatchout", tHost)
  callNamed("executeMessage", symbol("SendMinigameAction"), 5, new LingoList([]))
  callMethod("collisionNotification", callMethod("GetVisual", callMethod("getObject", _me)), _type, _collisionType, _collisionObject)
  }

}

