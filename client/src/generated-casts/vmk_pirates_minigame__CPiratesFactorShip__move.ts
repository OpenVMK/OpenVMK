// vmk_pirates_minigame.cct / CPiratesFactorShip / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tBonus = theProperty("milliSeconds");
  var t_bSync = callMethod("getSyncState", callMethod("GetMinigameHandler", meProp(_me, "m_rGameEngine")));
  if (t_bSync) {
  var tMyObject = callMethod("getObject", _me);
  callMethod("SetParam", tMyObject, "LastMove", theProperty("milliSeconds"))
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  var tdir = callMethod("GetParam", tMyObject, "Direction");
  var tNavigationTarget = callMethod("GetParam", tMyObject, "NavigationTarget");
  var tTURNING_RATE = callMethod("GetParam", tMyObject, "TurningRate");
  var tSpeed = callMethod("GetParam", tMyObject, "Speed");
  var tstate = callMethod("GetParam", tMyObject, "State");
  var tExtraParams = callMethod("GetParam", tMyObject, "GameParams");
  var tVel = callNamed("intvector", tExtraParams[1], tExtraParams[2], 0);
  var tWind = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 8);
  var tWindStrength = 0;
  var tWindDirection = 0;
  if (lingoBinary("neq", tWind.count, 1)) {
  callNamed("error", _me, "Either no wind indicator object found or more than 1 found!", symbol("move"))
  } else {
  tWindStrength = callMethod("GetParam", tWind[1], "Strength");
  tWindDirection = callMethod("GetParam", tWind[1], "Direction");
  }

  var tOrigPosX = tPos.x;
  var tOrigPosY = tPos.y;
  var tOrigDir = tdir;
  var t_ar_Whirlpools = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 12);
  if (lingoBinary("gt", t_ar_Whirlpools.count, 0)) {
  var tWhirlpool = t_ar_Whirlpools[1];
  var tWpPos = callMethod("GetParam", tWhirlpool, "WorldPosition");
  var tSuckState = callMethod("GetParam", tMyObject, "WhirlpoolSuckState");
  if (lingoBinary("and", lingoBinary("eq", tSuckState, -float(1)), callMethod("testDistance", _me, tPos.x, tPos.y, tWpPos.x, tWpPos.y, 3500))) {
  tstate = callNamed("ClearBit", tstate, meProp(_me, "m_MOVEBIT"));
  callMethod("SetParam", tMyObject, "WhirlpoolSuckState", 0)
  } else {
  if (lingoBinary("gt", tSuckState, -float(1))) {
  if (lingoBinary("lt", tSuckState, meProp(_me, "m_a3_ws").count)) {
  var tAngle = meProp(_me, "m_a3_ws")[lingoBinary("add", tSuckState, 1)][1];
  var tMagnitude = meProp(_me, "m_a3_ws")[lingoBinary("add", tSuckState, 1)][2];
  var tRotation = meProp(_me, "m_a3_ws")[lingoBinary("add", tSuckState, 1)][3];
  tdir = callNamed("AdjustDirection", tdir, tRotation);
  callMethod("SetParam", tMyObject, "Direction", tdir)
  var tThrowDir = 0;
  if (lingoBinary("eq", tAngle, -float(1000))) {
  var tQRandom = callMethod("GetQuickRandom", meProp(_me, "m_rGameEngine"));
  var tSeed = callMethod("IterateSeed", tQRandom, lingoBinary("add", callMethod("GetTurnNumber", meProp(_me, "m_rGameEngine")), tPos.x));
  tThrowDir = callMethod("getRandomNumber", tQRandom, tSeed, 360);
  } else {
  var tWhirlPos = callMethod("GetParam", tWhirlpool, "WorldPosition");
  tThrowDir = callMethod("getAngleFromComponents", callMethod("GetComponentToAngle", meProp(_me, "m_rGameEngine")), lingoBinary("sub", tWhirlPos.x, tPos.x), lingoBinary("sub", tWhirlPos.y, tPos.y));
  tThrowDir = lingoBinary("add", tThrowDir, tAngle);
  }

  var tVelTable = callMethod("GetVelocityTable", meProp(_me, "m_rGameEngine"));
  setThePropOf(tPos, "x", lingoBinary("add", tPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", tVelTable, tThrowDir), tMagnitude), 256)));
  setThePropOf(tPos, "y", lingoBinary("add", tPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", tVelTable, tThrowDir), tMagnitude), 256)));
  callMethod("SetParam", callMethod("getObject", _me), "WorldPosition", tPos)
  var tColliding = callMethod("TestCollision", _me);
  if (tColliding) {
  setThePropOf(tPos, "x", tOrigPosX);
  setThePropOf(tPos, "y", tOrigPosY);
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  }

  setThePropOf(tVel, "x", lingoBinary("sub", tPos.x, tOrigPosX));
  setThePropOf(tVel, "y", lingoBinary("sub", tPos.y, tOrigPosY));
  callMethod("SetParam", tMyObject, "Velocity", tVel)
  callMethod("SetParam", tMyObject, "WhirlpoolSuckState", lingoBinary("add", tSuckState, 1))
  callMethod("SyncGameParameters", _me)
  return;
  } else {
  callMethod("SetParam", tMyObject, "WhirlpoolSuckState", -float(1))
  }

  }

  }

  }

  if (lingoBinary("and", callNamed("TestBit", tstate, meProp(_me, "m_MOVEBIT")), (lingoTruthy(callNamed("TestBit", tstate, meProp(_me, "m_DESTROYEDBIT"))) ? 0 : 1))) {
  var navigationDirection = callMethod("getAngleFromComponents", callMethod("GetComponentToAngle", meProp(_me, "m_rGameEngine")), lingoBinary("sub", tNavigationTarget.x, tPos.x), lingoBinary("sub", tNavigationTarget.y, tPos.y));
  var difference = lingoBinary("sub", tdir, navigationDirection);
  var absoluteDifference = callNamed("abs", difference);
  if (lingoBinary("lt", absoluteDifference, tTURNING_RATE)) {
  tdir = navigationDirection;
  } else {
  if (lingoBinary("lt", absoluteDifference, 180)) {
  if (lingoBinary("lt", difference, 0)) {
  tdir = callNamed("AdjustDirection", tdir, tTURNING_RATE);
  } else {
  tdir = callNamed("AdjustDirection", tdir, -float(tTURNING_RATE));
  }

  } else {
  if (lingoBinary("lt", difference, 0)) {
  tdir = callNamed("AdjustDirection", tdir, -float(tTURNING_RATE));
  } else {
  tdir = callNamed("AdjustDirection", tdir, tTURNING_RATE);
  }

  }

  }

  if (lingoBinary("and", lingoBinary("and", lingoBinary("and", lingoBinary("gt", tPos.x, lingoBinary("sub", tNavigationTarget.x, callMethod("GetParam", tMyObject, "NavigationStopRadius"))), lingoBinary("lt", tPos.x, lingoBinary("add", tNavigationTarget.x, callMethod("GetParam", tMyObject, "NavigationStopRadius")))), lingoBinary("gt", tPos.y, lingoBinary("sub", tNavigationTarget.y, callMethod("GetParam", tMyObject, "NavigationStopRadius")))), lingoBinary("lt", tPos.y, lingoBinary("add", tNavigationTarget.y, callMethod("GetParam", tMyObject, "NavigationStopRadius"))))) {
  tstate = callNamed("ClearBit", tstate, meProp(_me, "m_MOVEBIT"));
  setThePropOf(tVel, "x", 0);
  setThePropOf(tVel, "y", 0);
  } else {
  tVel = callMethod("GetVelocityVector", _me, tstate, tdir, tSpeed);
  tPos = callMethod("add", tPos, tVel);
  }

  }

  if (callMethod("GetParam", tMyObject, "WindAffects")) {
  tPos = callMethod("add", tPos, callMethod("GetVelocityVector", _me, tstate, tWindDirection, tWindStrength));
  }

  callMethod("SetParam", tMyObject, "State", tstate)
  callMethod("SetParam", tMyObject, "Direction", tdir)
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  var tcol = theProperty("milliSeconds");
  tColliding = 0;
  if (lingoBinary("or", (lingoTruthy(callNamed("TestBit", tstate, meProp(_me, "m_DESTROYEDBIT"))) ? 0 : 1), callNamed("TestBit", tstate, meProp(_me, "m_FLOATINGWRECKBIT")))) {
  tColliding = callMethod("TestCollision", _me);
  if (callNamed("TestBit", tstate, meProp(_me, "m_MOVEBIT"))) {
  if (tColliding) {
  var tTestDir = callNamed("AdjustDirection", tdir, 45);
  var tTestPos = callMethod("add", callNamed("intvector", tOrigPosX, tOrigPosY, 0), callMethod("GetVelocityVector", _me, tstate, tTestDir, lingoBinary("div", tSpeed, 2)));
  callMethod("SetParam", tMyObject, "WorldPosition", tTestPos)
  tColliding = callMethod("TestCollision", _me);
  if (tColliding) {
  tTestDir = callNamed("AdjustDirection", tdir, -float(45));
  tTestPos = callMethod("add", callNamed("intvector", tOrigPosX, tOrigPosY, 0), callMethod("GetVelocityVector", _me, tstate, tTestDir, lingoBinary("div", tSpeed, 2)));
  callMethod("SetParam", tMyObject, "WorldPosition", tTestPos)
  tColliding = callMethod("TestCollision", _me);
  if (tColliding) {
  tTestDir = callNamed("AdjustDirection", tdir, 85);
  tTestPos = callMethod("add", callNamed("intvector", tOrigPosX, tOrigPosY, 0), callMethod("GetVelocityVector", _me, tstate, tTestDir, lingoBinary("div", tSpeed, 2)));
  callMethod("SetParam", tMyObject, "WorldPosition", tTestPos)
  tColliding = callMethod("TestCollision", _me);
  if (tColliding) {
  tTestDir = callNamed("AdjustDirection", tdir, -float(85));
  tTestPos = callMethod("add", callNamed("intvector", tOrigPosX, tOrigPosY, 0), callMethod("GetVelocityVector", _me, tstate, tTestDir, lingoBinary("div", tSpeed, 2)));
  callMethod("SetParam", tMyObject, "WorldPosition", tTestPos)
  tColliding = callMethod("TestCollision", _me);
  if ((lingoTruthy(tColliding) ? 0 : 1)) {
  tPos = tTestPos;
  }

  } else {
  tPos = tTestPos;
  }

  } else {
  tPos = tTestPos;
  }

  } else {
  tPos = tTestPos;
  }

  }

  }

  }

  setGlobal("g_profCollisionAcc", lingoBinary("add", globalVar("g_profCollisionAcc"), lingoBinary("sub", theProperty("milliSeconds"), tcol)));
  if (tColliding) {
  setThePropOf(tPos, "x", tOrigPosX);
  setThePropOf(tPos, "y", tOrigPosY);
  callMethod("SetParam", tMyObject, "Direction", tOrigDir)
  setThePropOf(tVel, "x", 0);
  setThePropOf(tVel, "y", 0);
  }

  setThePropOf(tVel, "x", lingoBinary("sub", tPos.x, tOrigPosX));
  setThePropOf(tVel, "y", lingoBinary("sub", tPos.y, tOrigPosY));
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  callMethod("SetParam", tMyObject, "Velocity", tVel)
  callMethod("SyncGameParameters", _me)
  }

  tBonus = lingoBinary("sub", theProperty("milliSeconds"), tBonus);
  setGlobal("g_profShipFactorAcc", lingoBinary("add", globalVar("g_profShipFactorAcc"), tBonus));
}

