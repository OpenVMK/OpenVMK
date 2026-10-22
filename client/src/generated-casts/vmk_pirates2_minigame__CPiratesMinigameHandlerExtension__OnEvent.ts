// vmk_pirates2_minigame.cct / CPiratesMinigameHandlerExtension / OnEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEvent(_me: LingoMe, i_iEvent: LingoValue, i_ar_iData: LingoValue) {
  var tGameEngine = callMethod("getComponent", callNamed("getThread", "minigame"));
  var tPiratesEngine = callMethod("getComponent", callNamed("getThread", "piratesminigame"));
  var tPiratesInterface = callMethod("getInterface", callNamed("getThread", "piratesminigame"));
  var tCannonBallSpeed = callNamed("getVariableValue", "game.cannonballspeed");
  var tCannonballTTL = callNamed("getVariableValue", "game.cannonballtimetolive");
  var tDebugOut = 0;
  switch (i_iEvent) {
case 1:
  var tRef = i_ar_iData[1];
  var tNavX = i_ar_iData[2];
  var tNavY = i_ar_iData[3];
  var t_rShip = callMethod("GetMGObject", tGameEngine, tRef);
  callMethod("SetNavigationTarget", callMethod("GetFactor", t_rShip), tNavX, tNavY)
  break;
case 2:
  if (tDebugOut) {
  callNamed("put", "Start shoot: Obsolete!")
  }

  break;
case 3:
  if (tDebugOut) {
  callNamed("put", "Shoot")
  }

  var tShooter = i_ar_iData[1];
  var tCannonball = i_ar_iData[2];
  var tX = i_ar_iData[3];
  var tY = i_ar_iData[4];
  t_rShip = callMethod("GetMGObject", tGameEngine, tShooter);
  if (callMethod("Shoot", callMethod("GetFactor", t_rShip))) {
  var tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), tCannonball)
  callMethod("setaProp", tParams, symbol("type"), 2)
  callMethod("setaProp", tParams, symbol("owner"), callMethod("GetParam", callMethod("getObject", t_rShip), "Owner"))
  callMethod("setaProp", tParams, symbol("team"), callMethod("GetParam", callMethod("getObject", t_rShip), "Team"))
  var tWorldPos = callMethod("GetParam", callMethod("getObject", t_rShip), "WorldPosition");
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  var tDiff = callMethod("substract", callNamed("intvector", tX, tY, 0), tWorldPos);
  var tdir = callMethod("getAngleFromComponents", callMethod("GetComponentToAngle", tGameEngine), tDiff.x, tDiff.y);
  var tNewPos = callNamed("intvector", lingoBinary("add", tWorldPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", callMethod("GetVelocityTable", tGameEngine), tdir), callMethod("GetParam", callMethod("getObject", t_rShip), "BowCannonOffset")), 256)), lingoBinary("add", tWorldPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", callMethod("GetVelocityTable", tGameEngine), tdir), callMethod("GetParam", callMethod("getObject", t_rShip), "BowCannonOffset")), 256)), 500);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  var tVel = callNamed("intvector", lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256), lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256), 0);
  var tInvincible = callNamed("TestBit", callMethod("GetParam", callMethod("getObject", t_rShip), "State"), 6);
  var tCannonballs = callMethod("GetParam", callMethod("getObject", t_rShip), "Ammo");
  var tGolden = 0;
  if (callNamed("listp", tCannonballs)) {
  if (lingoBinary("gt", tCannonballs.count, 0)) {
  tGolden = tCannonballs[1];
  }

  }

  var tstate = 0;
  if (tInvincible) {
  tstate = callNamed("SetBit", tstate, 1);
  }

  if (tGolden) {
  tstate = callNamed("SetBit", tstate, 4);
  }

  callMethod("setaProp", tParams, symbol("extra"), new LingoList([tShooter, callNamed("integer", tVel.x), callNamed("integer", tVel.y), tCannonballTTL, tstate]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO:", tCannonball), tParams)
  callMethod("PlayCannon", callMethod("GetSoundPlayer", tPiratesEngine), tGolden)
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", callNamed("point", tNewPos.x, tNewPos.y)), "puff", callMethod("GetNewReference", tPiratesEngine))
  }

  break;
case 4:
  if (tDebugOut) {
  callNamed("put", "turret shoot")
  }

  tShooter = i_ar_iData[1];
  tCannonball = i_ar_iData[2];
  tdir = i_ar_iData[3];
  var t_rTurret = callMethod("GetMGObject", tGameEngine, tShooter);
  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), tCannonball)
  callMethod("setaProp", tParams, symbol("type"), 2)
  callMethod("setaProp", tParams, symbol("owner"), -float(1))
  callMethod("setaProp", tParams, symbol("team"), -float(1))
  tWorldPos = callMethod("GetParam", callMethod("getObject", t_rTurret), "WorldPosition");
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  tNewPos = callNamed("intvector", lingoBinary("add", tWorldPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256)), lingoBinary("add", tWorldPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256)), 500);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  tVel = callNamed("intvector", lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256), lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256), 0);
  tstate = 0;
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([tShooter, callNamed("integer", tVel.x), callNamed("integer", tVel.y), tCannonballTTL, tstate]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO:", tCannonball), tParams)
  callMethod("PlayCannon", callMethod("GetSoundPlayer", tPiratesEngine))
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", callNamed("point", tNewPos.x, tNewPos.y)), "puff", callMethod("GetNewReference", tPiratesEngine))
  break;
case 5:
  if (tDebugOut) {
  callNamed("put", "Create Powerup")
  }

  var tPowerup = i_ar_iData[1];
  var tPosX = i_ar_iData[2];
  var tPosY = i_ar_iData[3];
  var ttype = i_ar_iData[4];
  tstate = i_ar_iData[5];
  var tTeam = i_ar_iData[6];
  var tAmount = i_ar_iData[7];
  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), tPowerup)
  callMethod("setaProp", tParams, symbol("type"), 3)
  callMethod("setaProp", tParams, symbol("owner"), -float(1))
  callMethod("setaProp", tParams, symbol("team"), tTeam)
  tNewPos = callNamed("intvector", tPosX, tPosY, 0);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([ttype, tstate, tAmount]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO", tPowerup), tParams)
  break;
case 6:
  if (tDebugOut) {
  callNamed("put", "Kill Ship")
  }

  var tShip = callMethod("GetMGObject", tGameEngine, i_ar_iData[1]);
  var t_shipPos = callMethod("GetParam", tShip, "WorldPosition");
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", callNamed("point", t_shipPos.x, t_shipPos.y)), "explosion", callMethod("GetNewReference", tPiratesEngine))
  callMethod("PlayHit", callMethod("GetSoundPlayer", tPiratesEngine))
  callMethod("Kill", callMethod("GetFactor", tShip))
  if (lingoBinary("neq", i_ar_iData[2], -float(1))) {
  var tKiller = callMethod("GetMGObject", tGameEngine, i_ar_iData[2]);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", tKiller)) ? 0 : 1), lingoBinary("neq", i_ar_iData[3], -float(1)))) {
  callMethod("AwardScore", callMethod("GetFactor", tKiller), i_ar_iData[3])
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", tShip)) ? 0 : 1), lingoBinary("neq", i_ar_iData[4], -float(1)))) {
  callMethod("LoseGold", callMethod("GetFactor", tShip), i_ar_iData[4])
  }

  }

  break;
case 7:
  if (tDebugOut) {
  callNamed("put", "Kill fixture")
  }

  var tFixture = callMethod("GetMGObject", tGameEngine, i_ar_iData[1]);
  tKiller = callMethod("GetMGObject", tGameEngine, i_ar_iData[2]);
  callMethod("PlayHit", callMethod("GetSoundPlayer", tPiratesEngine))
  callMethod("Kill", callMethod("GetFactor", tFixture))
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", tKiller)) ? 0 : 1), lingoBinary("neq", i_ar_iData[3], -float(1)))) {
  callMethod("AwardScore", callMethod("GetFactor", tKiller), i_ar_iData[3])
  }

  break;
case 8:
  break;
case 9:
  break;
case 10:
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Wind Change dir :", i_ar_iData[1]), "vel :"), i_ar_iData[2]))
  }

  var tWindIndicator = callMethod("GetObjectsByCode", tGameEngine, 8);
  if (lingoBinary("neq", tWindIndicator.count, 1)) {
  return callNamed("error", _me, "Either no wind indicator object found or more than 1 found!", symbol("OnEvent"));
  }

  callMethod("ChangeWind", callMethod("GetFactor", tWindIndicator[1]), i_ar_iData[1], i_ar_iData[2])
  break;
case 11:
  var tCollector = i_ar_iData[1];
  ttype = i_ar_iData[2];
  tstate = i_ar_iData[3];
  tTeam = i_ar_iData[4];
  var tPowerupAmount = i_ar_iData[5];
  tShip = callMethod("GetMGObject", tGameEngine, tCollector);
  if (lingoBinary("eq", ttype, 1)) {
  tCannonballs = callMethod("GetParam", callMethod("getObject", tShip), "Ammo");
  if (lingoBinary("eq", tstate, 1)) {
  for (var i = 1; i <= tPowerupAmount; ++i) {
  if (lingoBinary("eq", i, 1)) {
  callMethod("append", tCannonballs, 1)
  continue;
  }

  callMethod("append", tCannonballs, 0)
  }

  } else {
  for (var i = 1; i <= tPowerupAmount; ++i) {
  callMethod("append", tCannonballs, 0)
  }

  }

  while (lingoBinary("gt", tCannonballs.count, callMethod("GetParam", callMethod("getObject", tShip), "MaxAmmo"))) {
  callMethod("deleteAt", tCannonballs, tCannonballs.count)
  }

  callMethod("SetParam", callMethod("getObject", tShip), "Ammo", tCannonballs)
  } else {
  if (lingoBinary("eq", ttype, 2)) {
  var tHealth = callMethod("GetParam", callMethod("getObject", tShip), "Health");
  tHealth = lingoBinary("add", tHealth, tPowerupAmount);
  if (lingoBinary("gt", tHealth, callMethod("GetParam", callMethod("getObject", tShip), "MaxHealth"))) {
  tHealth = callMethod("GetParam", callMethod("getObject", tShip), "MaxHealth");
  }

  callMethod("SetParam", callMethod("getObject", tShip), "Health", tHealth)
  } else {
  if (lingoBinary("eq", ttype, 3)) {
  var tOwnFlag = 1;
  if (lingoBinary("neq", callMethod("GetParam", tShip, "Team"), tTeam)) {
  tOwnFlag = 0;
  }

  callMethod("setCarryingFlag", callMethod("GetFactor", tShip), 1, tOwnFlag)
  }

  }

  }

  callMethod("SyncGameParameters", callMethod("GetFactor", tShip))
  if (lingoBinary("eq", tShip, callMethod("GetMyObjects", callNamed("getObject", symbol("minigame_component")))[1])) {
  if (lingoBinary("eq", ttype, 1)) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", tPiratesEngine), symbol("GetAmmo"))
  } else {
  if (lingoBinary("eq", ttype, 2)) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", tPiratesEngine), symbol("GetHealth"))
  } else {
  if (lingoBinary("eq", ttype, 3)) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", tPiratesEngine), symbol("GetFlag"))
  }

  }

  }

  }

  break;
case 12:
  if (tDebugOut) {
  callNamed("put", "Cannonball hits environment")
  }

  var tPos = callNamed("point", i_ar_iData[1], i_ar_iData[2]);
  var tHeight = callMethod("TestPointToCMap", callMethod("GetCollisionMap", tPiratesEngine), tPos);
  if (lingoBinary("lte", tHeight, 0)) {
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", tPos), "splash", callMethod("GetNewReference", tPiratesEngine))
  callMethod("PlaySplash", callMethod("GetSoundPlayer", tPiratesEngine))
  } else {
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", tPos), "explosion", callMethod("GetNewReference", tPiratesEngine))
  callMethod("PlayHit", callMethod("GetSoundPlayer", tPiratesEngine))
  }

  break;
case 13:
  if (tDebugOut) {
  callNamed("put", "Cannonball hits enemy ship")
  }

  var tTargetRef = i_ar_iData[1];
  tPos = callNamed("point", i_ar_iData[2], i_ar_iData[3]);
  var tShooterRef = i_ar_iData[4];
  var tScore = i_ar_iData[5];
  t_rShip = callMethod("GetMGObject", tGameEngine, tTargetRef);
  t_shipPos = callMethod("GetParam", callMethod("getObject", t_rShip), "WorldPosition");
  var tScreenPos = callNamed("ProjectAxonometricPosition", callNamed("point", t_shipPos.x, t_shipPos.y));
  callMethod("CreatePuff", tPiratesEngine, tScreenPos, "explosion", callMethod("GetNewReference", tPiratesEngine))
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Cannonball hit ship at", new LingoList([tTargetRef, tPos, tShooterRef, tScore])))
  }

  if (lingoBinary("gt", callMethod("GetHealth", callMethod("GetFactor", t_rShip)), -float(1))) {
  callMethod("LoseHealth", callMethod("GetFactor", t_rShip))
  callMethod("CreateNewFloat", callMethod("GetFloatFactory", tPiratesEngine), lingoBinary("joinPad", tScore, "gold"), callNamed("point", tScreenPos.locH, lingoBinary("sub", tScreenPos.locV, 20)))
  tShooter = callMethod("GetMGObject", tGameEngine, tShooterRef);
  callMethod("AwardScore", callMethod("GetFactor", tShooter), tScore)
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Cannonball hit award Gold to Shooter", new LingoList([tShooter, tScore])))
  }

  }

  callMethod("PlayHit", callMethod("GetSoundPlayer", tPiratesEngine))
  break;
case 14:
  if (tDebugOut) {
  callNamed("put", "Cannonball hits fixture")
  }

  var tTarget = i_ar_iData[1];
  var t_rFixture = callMethod("GetMGObject", tGameEngine, tTarget);
  callMethod("HitByCannonball", callMethod("GetFactor", t_rFixture))
  tScreenPos = callNamed("ProjectAxonometricPosition", callNamed("point", i_ar_iData[2], i_ar_iData[3]));
  callMethod("CreatePuff", tPiratesEngine, tScreenPos, "explosion", callMethod("GetNewReference", tPiratesEngine), 2)
  var t_rShooter = callMethod("GetMGObject", tGameEngine, i_ar_iData[4]);
  callMethod("AwardScore", callMethod("GetFactor", t_rShooter), i_ar_iData[5])
  if (lingoBinary("gt", i_ar_iData[5], 0)) {
  callMethod("CreateNewFloat", callMethod("GetFloatFactory", tPiratesEngine), lingoBinary("join", i_ar_iData[5], " pts"), callNamed("point", tScreenPos.locH, lingoBinary("sub", tScreenPos.locV, 20)))
  }

  callMethod("PlayHit", callMethod("GetSoundPlayer", tPiratesEngine))
  break;
case 15:
  tRef = i_ar_iData[1];
  break;
case 16:
  tShooter = i_ar_iData[1];
  var tCannonballRef = i_ar_iData[2];
  var tSide = i_ar_iData[3];
  var tCannonNum = i_ar_iData[4];
  tGolden = i_ar_iData[5];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", "Broadsideshot : ", tShooter), tSide), tCannonNum))
  }

  t_rShip = callMethod("GetMGObject", tGameEngine, tShooter);
  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), tCannonballRef)
  callMethod("setaProp", tParams, symbol("type"), 2)
  callMethod("setaProp", tParams, symbol("owner"), callMethod("GetParam", callMethod("getObject", t_rShip), "Owner"))
  callMethod("setaProp", tParams, symbol("team"), callMethod("GetParam", callMethod("getObject", t_rShip), "Team"))
  var tAmmo = callMethod("GetParam", callMethod("getObject", t_rShip), "Ammo");
  tdir = callMethod("GetParam", callMethod("getObject", t_rShip), "Direction");
  switch (tSide) {
case 0:
  switch (tCannonNum) {
case 1:
  tdir = lingoBinary("sub", tdir, 80);
  if (lingoBinary("gt", tAmmo.count, 0)) {
  callMethod("deleteAt", tAmmo, 1)
  }

  callMethod("PlayCannon", callMethod("GetSoundPlayer", tPiratesEngine))
  break;
case 2:
  tdir = lingoBinary("sub", tdir, 85);
  break;
case 3:
  tdir = lingoBinary("sub", tdir, 90);
  break;
case 4:
  tdir = lingoBinary("sub", tdir, 95);
  break;
case 5:
  tdir = lingoBinary("sub", tdir, 100);
  break;
  }

  break;
case 1:
  switch (tCannonNum) {
case 1:
  tdir = lingoBinary("add", tdir, 80);
  if (lingoBinary("gt", tAmmo.count, 0)) {
  callMethod("deleteAt", tAmmo, 1)
  }

  callMethod("PlayCannon", callMethod("GetSoundPlayer", tPiratesEngine))
  break;
case 2:
  tdir = lingoBinary("add", tdir, 85);
  break;
case 3:
  tdir = lingoBinary("add", tdir, 90);
  break;
case 4:
  tdir = lingoBinary("add", tdir, 95);
  break;
case 5:
  tdir = lingoBinary("add", tdir, 100);
  break;
  }

  break;
  }

  if (lingoBinary("lt", tdir, 0)) {
  tdir = lingoBinary("add", tdir, 360);
  }

  tdir = lingoBinary("mod", tdir, 360);
  callMethod("SetParam", callMethod("getObject", t_rShip), "Ammo", tAmmo)
  tWorldPos = callMethod("GetParam", callMethod("getObject", t_rShip), "WorldPosition");
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  var tOffset = callMethod("GetParam", t_rShip, "SideCannonOffset");
  tNewPos = callNamed("intvector", lingoBinary("add", tWorldPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", callMethod("GetVelocityTable", tGameEngine), tdir), tOffset), 256)), lingoBinary("add", tWorldPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", callMethod("GetVelocityTable", tGameEngine), tdir), tOffset), 256)), 500);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  tVel = callNamed("intvector", lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256), lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", callMethod("GetVelocityTable", tGameEngine), tdir), tCannonBallSpeed), 256), 0);
  tInvincible = callNamed("TestBit", callMethod("GetParam", callMethod("getObject", t_rShip), "State"), 6);
  tstate = 0;
  if (tInvincible) {
  tstate = callNamed("SetBit", tstate, 1);
  }

  if (tGolden) {
  tstate = callNamed("SetBit", tstate, 4);
  }

  callMethod("setaProp", tParams, symbol("extra"), new LingoList([tShooter, callNamed("integer", tVel.x), callNamed("integer", tVel.y), tCannonballTTL, tstate]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO:", tCannonballRef), tParams)
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", callNamed("point", tNewPos.x, tNewPos.y)), "puff", callMethod("GetNewReference", tPiratesEngine))
  break;
case 17:
  break;
case 18:
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "sea monster show", i_ar_iData[4]))
  }

  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), i_ar_iData[1])
  callMethod("setaProp", tParams, symbol("type"), i_ar_iData[4])
  callMethod("setaProp", tParams, symbol("owner"), -float(1))
  callMethod("setaProp", tParams, symbol("team"), -float(1))
  tNewPos = callNamed("intvector", i_ar_iData[2], i_ar_iData[3], 0);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  tVel = callNamed("intvector", 0, 0, 0);
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([callNamed("integer", tNewPos.x), callNamed("integer", tNewPos.y)]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO", i_ar_iData[1]), tParams)
  callMethod("playFx", callMethod("GetSoundPlayer", tPiratesEngine), "PG-seamonster-long")
  break;
case 19:
  if (tDebugOut) {
  callNamed("put", " sea monster hide")
  }

  callMethod("_MinigameDeleteObject", tGameEngine, i_ar_iData[1])
  break;
case 20:
  if (tDebugOut) {
  callNamed("put", "sea monster eat ship")
  }

  var tMonster = callMethod("GetMGObject", tGameEngine, i_ar_iData[1]);
  callMethod("Attack", callMethod("GetFactor", tMonster))
  tShip = callMethod("GetMGObject", tGameEngine, i_ar_iData[2]);
  var tHealthLost = i_ar_iData[3];
  for (var i = 1; i <= tHealthLost; ++i) {
  callMethod("LoseHealth", callMethod("GetFactor", tShip))
  }

  callMethod("PlaySeaMonsterAttack", callMethod("GetSoundPlayer", tPiratesEngine))
  break;
case 21:
  if (tDebugOut) {
  callNamed("put", "whirlpool show")
  }

  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), i_ar_iData[1])
  callMethod("setaProp", tParams, symbol("type"), 12)
  callMethod("setaProp", tParams, symbol("owner"), -float(1))
  callMethod("setaProp", tParams, symbol("team"), -float(1))
  tNewPos = callNamed("intvector", i_ar_iData[2], i_ar_iData[3], 0);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO", i_ar_iData[1]), tParams)
  break;
case 22:
  if (tDebugOut) {
  callNamed("put", "whirlpool hide")
  }

  callMethod("_MinigameDeleteObject", tGameEngine, i_ar_iData[1])
  break;
case 23:
  if (tDebugOut) {
  callNamed("put", "Show moonlight")
  }

  var tMoonlight = i_ar_iData[1];
  tPosX = i_ar_iData[2];
  tPosY = i_ar_iData[3];
  var tVelX = i_ar_iData[4];
  var tVelY = i_ar_iData[5];
  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), tMoonlight)
  callMethod("setaProp", tParams, symbol("type"), 13)
  callMethod("setaProp", tParams, symbol("owner"), -float(1))
  callMethod("setaProp", tParams, symbol("team"), -float(1))
  tNewPos = callNamed("intvector", tPosX, tPosY, 0);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  tVel = callNamed("intvector", tVelX, tVelY, 0);
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([callNamed("integer", tVel.x), callNamed("integer", tVel.y)]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO", tMoonlight), tParams)
  break;
case 24:
  if (tDebugOut) {
  callNamed("put", "Hide moonlight")
  }

  tMoonlight = i_ar_iData[1];
  callMethod("_MinigameDeleteObject", tGameEngine, tMoonlight)
  break;
case 25:
  if (tDebugOut) {
  callNamed("put", "invincibility on")
  }

  tTarget = i_ar_iData[1];
  t_rShip = callMethod("GetMGObject", tGameEngine, tTarget);
  callMethod("InvincibilityOn", callMethod("GetFactor", t_rShip))
  callMethod("playFx", callMethod("GetSoundPlayer", tPiratesEngine), "PG-moonlight")
  break;
case 26:
  if (tDebugOut) {
  callNamed("put", "invincibility off")
  }

  tTarget = i_ar_iData[1];
  t_rShip = callMethod("GetMGObject", tGameEngine, tTarget);
  callMethod("InvincibilityOff", callMethod("GetFactor", t_rShip))
  break;
case 27:
  if (tDebugOut) {
  callNamed("put", "show flaming oil")
  }

  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), i_ar_iData[1])
  callMethod("setaProp", tParams, symbol("type"), 14)
  callMethod("setaProp", tParams, symbol("owner"), -float(1))
  callMethod("setaProp", tParams, symbol("team"), -float(1))
  tNewPos = callNamed("intvector", i_ar_iData[2], i_ar_iData[3], 0);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", "MGO", i_ar_iData[1]), tParams)
  break;
case 28:
  if (tDebugOut) {
  callNamed("put", "hide flaming oil")
  }

  callMethod("_MinigameDeleteObject", tGameEngine, i_ar_iData[1])
  break;
case 29:
  if (tDebugOut) {
  callNamed("put", "flaming oil burn")
  }

  tShip = callMethod("GetMGObject", tGameEngine, i_ar_iData[2]);
  callMethod("Burn", callMethod("GetFactor", tShip))
  break;
case 30:
  if (tDebugOut) {
  callNamed("put", "blow up ship")
  }

  tShip = callMethod("GetMGObject", tGameEngine, i_ar_iData[1]);
  tPos = callMethod("GetParam", callMethod("getObject", tShip), "WorldPosition");
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y)), "explosion", callMethod("GetNewReference", tPiratesEngine), 5)
  callMethod("CreatePuff", tPiratesEngine, callNamed("ProjectAxonometricPosition", callNamed("point", lingoBinary("add", tPos.x, 500), lingoBinary("add", tPos.y, 500))), "explosion", callMethod("GetNewReference", tPiratesEngine), 4)
  tShooter = callMethod("GetParam", callMethod("getObject", tShip), "Reference");
  var tSeed = callMethod("GetTurnNumber", tGameEngine);
  var tQRandom = callMethod("GetQuickRandom", tGameEngine);
  var tShrapnelCount = i_ar_iData[2];
  for (var i = 1; i <= tShrapnelCount; ++i) {
  tRef = i_ar_iData[lingoBinary("add", 2, i)];
  tSeed = callMethod("IterateSeed", tQRandom, tSeed);
  tdir = callMethod("getRandomNumber", tQRandom, tSeed, 360);
  tSeed = callMethod("IterateSeed", tQRandom, tSeed);
  var tVelSpeed = lingoBinary("sub", tCannonBallSpeed, callMethod("getRandomNumber", tQRandom, tSeed, lingoBinary("div", tCannonBallSpeed, 2)));
  tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), tRef)
  callMethod("setaProp", tParams, symbol("type"), 2)
  callMethod("setaProp", tParams, symbol("owner"), callMethod("GetParam", callMethod("getObject", tShip), "Owner"))
  callMethod("setaProp", tParams, symbol("team"), callMethod("GetParam", callMethod("getObject", tShip), "Team"))
  tWorldPos = callMethod("GetParam", callMethod("getObject", tShip), "WorldPosition");
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  tNewPos = callNamed("intvector", tWorldPos.x, tWorldPos.y, 500);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  tVel = callNamed("intvector", lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", callMethod("GetVelocityTable", tGameEngine), tdir), tVelSpeed), 256), lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", callMethod("GetVelocityTable", tGameEngine), tdir), tVelSpeed), 256), 0);
  tSeed = callMethod("IterateSeed", tQRandom, tSeed);
  var tTimeToLive = lingoBinary("add", callMethod("getRandomNumber", tQRandom, tSeed, lingoBinary("div", tCannonBallSpeed, 20)), 5);
  tstate = 4;
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([tShooter, callNamed("integer", tVel.x), callNamed("integer", tVel.y), tTimeToLive, tstate]))
  callMethod("_CreateObject", tGameEngine, lingoBinary("join", lingoBinary("join", lingoBinary("join", "MGO:", i), "+"), theProperty("milliSeconds")), tParams)
  }

  callMethod("Blow", callMethod("GetFactor", tShip))
  callMethod("PlayBroadSide", callMethod("GetSoundPlayer", tPiratesEngine))
  break;
case 31:
  if (tDebugOut) {
  callNamed("put", "sea monster move")
  }

  tMonster = callMethod("GetMGObject", tGameEngine, i_ar_iData[1]);
  var tGameParams = callMethod("GetParam", callMethod("getObject", tMonster), "GameParams");
  tGameParams[1] = i_ar_iData[2];
  tGameParams[2] = i_ar_iData[3];
  callMethod("SetParam", callMethod("getObject", tMonster), "GameParams", tGameParams)
  break;
case 32:
  callMethod("SetTimerDisplay", tPiratesInterface, i_ar_iData[1])
  break;
case 33:
  var tAvatarRef = i_ar_iData[1];
  var tTimer = i_ar_iData[2];
  var tMyShip = callMethod("GetMyShip", tPiratesInterface);
  if ((lingoTruthy(callNamed("voidp", tMyShip)) ? 0 : 1)) {
  if (lingoBinary("eq", tAvatarRef, callMethod("GetParam", tMyShip, "Reference"))) {
  callMethod("ShowIdleKickWarning", tPiratesInterface, tTimer)
  }

  }

  break;
case 34:
  var tDropper = i_ar_iData[1];
  ttype = i_ar_iData[2];
  tShip = callMethod("GetMGObject", tGameEngine, tDropper);
  if (lingoBinary("eq", ttype, 3)) {
  tOwnFlag = callMethod("IsCarryingOwnFlag", callMethod("GetFactor", tShip));
  var tEnemyFlag = callMethod("IsCarryingEnemyFlag", callMethod("GetFactor", tShip));
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "drop flag own flag: ", tOwnFlag), " enemy flag: "), tEnemyFlag))
  }

  callMethod("setCarryingFlag", callMethod("GetFactor", tShip), 0, tOwnFlag)
  callMethod("PlayDropFlag", callMethod("GetSoundPlayer", tPiratesEngine))
  }

  callMethod("SyncGameParameters", callMethod("GetFactor", tShip))
  break;
case 35:
  tShip = i_ar_iData[1];
  var tTeamBase = i_ar_iData[2];
  var tCorrectTeamBase = i_ar_iData[3];
  if (lingoBinary("eq", tCorrectTeamBase, 0)) {
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Ship", tShip), "reached enemy team base")
  }

  } else {
  if (lingoBinary("eq", tCorrectTeamBase, 1)) {
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Ship", tShip), "reached own team base!")
  }

  }

  }

  break;
case 36:
  tShip = i_ar_iData[1];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Ship changed to rowboat", i_ar_iData[1]))
  }

  tShip = callMethod("GetMGObject", tGameEngine, tShip);
  callMethod("setRowingBoat", callMethod("GetFactor", tShip), 1)
  tHealth = 0;
  callMethod("SetParam", callMethod("getObject", tShip), "Health", tHealth)
  tAmmo = new LingoList([]);
  callMethod("SetParam", callMethod("getObject", tShip), "Ammo", tAmmo)
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Ship changed to rowboat new health", tHealth), "new ammo"), tAmmo), "maxAmmo"), callMethod("GetParam", callMethod("getObject", tShip), "MaxAmmo")))
  }

  callMethod("SyncGameParameters", callMethod("GetFactor", tShip))
  if (lingoBinary("eq", tShip, callMethod("GetMyObjects", callNamed("getObject", symbol("minigame_component")))[1])) {
  callMethod("PlayTurnIntoRowboat", callMethod("GetSoundPlayer", tPiratesEngine))
  }

  break;
case 37:
  tShip = i_ar_iData[1];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Rowboat changed to ship", i_ar_iData))
  }

  tShip = callMethod("GetMGObject", tGameEngine, tShip);
  callMethod("setRowingBoat", callMethod("GetFactor", tShip), 0)
  tHealth = i_ar_iData[2];
  callMethod("SetParam", callMethod("getObject", tShip), "Health", tHealth)
  tAmmo = new LingoList([]);
  if (lingoBinary("gt", i_ar_iData[3], 0)) {
  tAmmo[i_ar_iData[3]] = 0;
  }

  callMethod("SetParam", callMethod("getObject", tShip), "Ammo", tAmmo)
  callMethod("SyncGameParameters", callMethod("GetFactor", tShip))
  break;
case 38:
  tShip = i_ar_iData[1];
  tTeamBase = i_ar_iData[2];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Ship brought the enemy flag home", i_ar_iData))
  }

  tShip = callMethod("GetMGObject", tGameEngine, tShip);
  tTeamBase = callMethod("GetMGObject", tGameEngine, tTeamBase);
  tOwnFlag = callMethod("IsCarryingOwnFlag", callMethod("GetFactor", tShip));
  callMethod("setCarryingFlag", callMethod("GetFactor", tShip), 0, tOwnFlag)
  callMethod("setCarryingFlag", callMethod("GetFactor", tTeamBase), 1)
  callMethod("SyncGameParameters", callMethod("GetFactor", tShip))
  callMethod("SyncGameParameters", callMethod("GetFactor", tTeamBase))
  callMethod("PlayFlagToBase", callMethod("GetSoundPlayer", tPiratesEngine))
  break;
case 39:
  var tWinnerTeam = i_ar_iData[1];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Team won", i_ar_iData))
  }

  var tScoreBoard = callMethod("GetObjectsByCode", tGameEngine, 9);
  if (lingoBinary("neq", tScoreBoard.count, 1)) {
  if (tDebugOut) {
  callNamed("put", "Scoreboard object could not be found!")
  }

  }

  callMethod("addTeamWin", callMethod("GetFactor", tScoreBoard[1]), tWinnerTeam)
  break;
case 40:
  var tGameMode = i_ar_iData[1];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "Extended play", i_ar_iData))
  }

  var tRemovedRefs = new LingoList([]);
  if (lingoBinary("eq", tGameMode, 1)) {
  var t_ar_Cannonballs = callMethod("GetObjectsByCode", tGameEngine, 3);
  for (var tObj of t_ar_Cannonballs.toArray()) {
  if (lingoBinary("and", callNamed("objectp", callMethod("GetFactor", tObj)), lingoBinary("eq", callMethod("GetParam", tObj, "PowerupType"), 1))) {
  tRef = callMethod("GetParam", tObj, "Reference");
  callMethod("add", tRemovedRefs, tRef)
  }

  }

  } else {
  if (lingoBinary("eq", tGameMode, 2)) {
  var t_ar_health = callMethod("GetObjectsByCode", tGameEngine, 3);
  for (var tObj of t_ar_health.toArray()) {
  if (lingoBinary("and", callNamed("objectp", callMethod("GetFactor", tObj)), lingoBinary("eq", callMethod("GetParam", tObj, "PowerupType"), 2))) {
  tRef = callMethod("GetParam", tObj, "Reference");
  callMethod("add", tRemovedRefs, tRef)
  }

  }

  t_ar_Cannonballs = callMethod("GetObjectsByCode", tGameEngine, 3);
  for (var tObj of t_ar_Cannonballs.toArray()) {
  if (lingoBinary("and", callNamed("objectp", callMethod("GetFactor", tObj)), lingoBinary("eq", callMethod("GetParam", tObj, "PowerupType"), 1))) {
  if ((lingoTruthy(callMethod("IsGolden", callMethod("GetFactor", tObj))) ? 0 : 1)) {
  callMethod("setGolden", callMethod("GetFactor", tObj), 1)
  callMethod("SyncGameParameters", callMethod("GetFactor", tObj))
  }

  }

  }

  }

  }

  for (var tRef of tRemovedRefs.toArray()) {
  callMethod("_MinigameDeleteObject", tGameEngine, tRef)
  }

  break;
case 41:
  tRef = i_ar_iData[1];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "expire powerup", tRef))
  }

  callMethod("_MinigameDeleteObject", tGameEngine, tRef)
  break;
case 42:
  tRef = i_ar_iData[1];
  if (tDebugOut) {
  callNamed("put", lingoBinary("joinPad", "about to expire powerup", tRef))
  }

  break;
  default:
  if (tDebugOut) {
  callNamed("put", "Pirates Minigame Handler : Unrecognized event ID")
  }

  }

}

