// vmk_pirates_game.cct / COilFactor / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  var t_bSync = callMethod("getSyncState", callMethod("GetMinigameHandler", meProp(_me, "m_rGameEngine")));
  if (t_bSync) {
  var tMyObject = callMethod("getObject", _me);
  var tAge = callMethod("GetParam", tMyObject, "Age");
  tAge = lingoBinary("add", tAge, 1);
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  var tOrigPosX = tPos.x;
  var tOrigPosY = tPos.y;
  var tWind = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 8);
  var tWindStrength = 0;
  var tWindDirection = 0;
  if (lingoBinary("neq", tWind.count, 1)) {
  callNamed("error", _me, "Either no wind indicator object found or more than 1 found!", symbol("move"))
  } else {
  tWindStrength = callMethod("GetParam", tWind[1], "Strength");
  tWindDirection = callMethod("GetParam", tWind[1], "Direction");
  }

  if (callMethod("GetParam", tMyObject, "WindAffects")) {
  var tPosDrift = callMethod("GetVelocityVector", _me, tWindDirection, tWindStrength);
  tPos = callMethod("add", tPos, tPosDrift);
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  var tColliding = callMethod("TestCollision", _me);
  if (tColliding) {
  setThePropOf(tPos, "x", tOrigPosX);
  setThePropOf(tPos, "y", tOrigPosY);
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  }

  callMethod("SetParam", tMyObject, "Age", tAge)
  }

  }

}

