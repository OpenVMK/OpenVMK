// vmk_pirates_minigame.cct / CPiratesFactorShip / IsShootable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsShootable(_me: LingoMe, a_vPos: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tVelTable = callMethod("GetVelocityTable", meProp(_me, "m_rGameEngine"));
  var tDistance = callMethod("substract", a_vPos, callMethod("GetParam", callMethod("getObject", _me), "WorldPosition"));
  var tDirection = callMethod("GetParam", callMethod("getObject", _me), "Direction");
  var tMenoVector = callNamed("intvector", callMethod("GetBaseVelX", tVelTable, tDirection), callMethod("GetBaseVelY", tVelTable, tDirection), 0);
  if (lingoBinary("and", lingoBinary("gt", callMethod("GetParam", callMethod("getObject", _me), "Ammo"), 0), lingoBinary("lte", callMethod("length", tDistance), lingoBinary("mul", 25, 1400)))) {
  var tAngle = callNamed("AngleBetweenVectors", tMenoVector, tDistance);
  if (lingoBinary("and", lingoBinary("gte", tAngle, callMethod("GetParam", callMethod("getObject", _me), "ArcStart")), lingoBinary("lte", tAngle, callMethod("GetParam", callMethod("getObject", _me), "ArcEnd")))) {
  return 1;
  } else {
  return 0;
  }

  } else {
  return 0;
  }

}

