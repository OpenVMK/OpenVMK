// vmk_pirates_game.cct / CSeamonsterFactor / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  var tMyObject = callMethod("getObject", _me);
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  var tdir = callMethod("GetParam", tMyObject, "Direction");
  var tGameParams = callMethod("GetParam", tMyObject, "GameParams");
  var tNavigationTarget = callNamed("intvector", tGameParams[1], tGameParams[2], 0);
  var tSpeed = callMethod("GetParam", tMyObject, "Speed");
  var tVel = callNamed("intvector", 0, 0, 0);
  var t_iDeltaX = lingoBinary("sub", tNavigationTarget.x, tPos.x);
  var t_iDeltaY = lingoBinary("sub", tNavigationTarget.y, tPos.y);
  var t_iDirection = callMethod("getAngleFromComponents", callMethod("GetComponentToAngle", meProp(_me, "m_rMGE")), t_iDeltaX, t_iDeltaY);
  if (lingoBinary("lt", t_iDeltaX, 0)) {
  t_iDeltaX = -float(t_iDeltaX);
  }

  if (lingoBinary("lt", t_iDeltaY, 0)) {
  t_iDeltaY = -float(t_iDeltaY);
  }

  if (lingoBinary("and", lingoBinary("lt", t_iDeltaX, 20), lingoBinary("lt", t_iDeltaY, 20))) {
  setThePropOf(tPos, "x", tNavigationTarget.x);
  setThePropOf(tPos, "y", tNavigationTarget.y);
  } else {
  var tVelTable = callMethod("GetVelocityTable", meProp(_me, "m_rMGE"));
  setThePropOf(tVel, "x", lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", tVelTable, t_iDirection), tSpeed), 256));
  setThePropOf(tVel, "y", lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", tVelTable, t_iDirection), tSpeed), 256));
  tPos = callMethod("add", tPos, tVel);
  }

  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  callMethod("SetParam", tMyObject, "GameParams", tGameParams)
}

