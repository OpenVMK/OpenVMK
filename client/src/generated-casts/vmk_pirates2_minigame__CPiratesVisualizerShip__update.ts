// vmk_pirates2_minigame.cct / CPiratesVisualizerShip / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  var tTime = theProperty("milliSeconds");
  var tMyObject = callMethod("getObject", _me);
  var tLastMove = callMethod("GetParam", tMyObject, "LastMove");
  var tDt = lingoBinary("div", lingoBinary("sub", tTime, tLastMove), float(1000));
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  var tdir = lingoBinary("add", callMethod("GetParam", tMyObject, "Direction"), 1);
  var tTeam = callMethod("GetParam", tMyObject, "Team");
  var tstate = callMethod("GetParam", tMyObject, "State");
  var tVelocity = callMethod("GetParam", tMyObject, "Velocity");
  var t_iGameMode = callMethod("GetGameMode", callMethod("getComponent", callNamed("getThread", "piratesminigame")));
  var tCarryingFlag = lingoBinary("or", callNamed("TestBit", tstate, meProp(_me, "m_CARRYINGOWNFLAGBIT")), callNamed("TestBit", tstate, meProp(_me, "m_CARRYINGENEMYFLAGBIT")));
  var tRowingBoat = callNamed("TestBit", tstate, meProp(_me, "m_ROWINGBOATBIT"));
  if (lingoBinary("eq", t_iGameMode, 2)) {
  var t_iGold = callMethod("GetParam", callMethod("getObject", _me), "Gold");
  if (lingoBinary("neq", t_iGold, meProp(_me, "m_iGold"))) {
  setMeProp(_me, "m_iGold", t_iGold);
  setMeProp(_me, "m_bOwnerWritten", 0);
  }

  }

  if (lingoBinary("gt", tdir, 360)) {
  tdir = 360;
  }

  if (lingoBinary("lt", tdir, 1)) {
  tdir = 1;
  }

  callMethod("SetGraphic", _me, tMyObject, tdir, tTeam)
  if (callNamed("voidp", meProp(_me, "m_vLocalPosition"))) {
  setMeProp(_me, "m_vLocalPosition", tPos);
  }

  if (callMethod("getSyncState", meProp(_me, "m_rMGE"))) {
  setMeProp(_me, "m_vLocalPosition", tPos);
  setMeProp(_me, "m_vLocalPosition", callMethod("add", meProp(_me, "m_vLocalPosition"), callMethod("multiply", tVelocity, lingoBinary("div", tDt, callMethod("GetSubturnSpacing", meProp(_me, "m_rMGE"))))));
  } else {
  setMeProp(_me, "m_vLocalPosition", meProp(_me, "m_vLocalPosition"));
  }

  setMeProp(_me, "m_sineOffset2", lingoBinary("add", meProp(_me, "m_sineOffset2"), 0.03));
  if (lingoBinary("gt", meProp(_me, "m_sineOffset2"), lingoBinary("mul", float(2), callNamed("pi")))) {
  setMeProp(_me, "m_sineOffset2", float(0));
  }

  var tWaveOffset = lingoBinary("mul", callNamed("sin", lingoBinary("add", lingoBinary("div", meProp(_me, "m_vLocalPosition").x, 2300), meProp(_me, "m_sineOffset2"))), 100);
  var tRotation = callNamed("sin", meProp(_me, "m_sineOffset1"));
  var tloc = callNamed("ProjectAxonometricPosition", callNamed("point", lingoBinary("add", meProp(_me, "m_vLocalPosition").x, tWaveOffset), lingoBinary("add", meProp(_me, "m_vLocalPosition").y, tWaveOffset)));
  var tInvincible = callNamed("TestBit", tstate, meProp(_me, "m_INVINCIBILITYBIT"));
  setThePropOf(meProp(_me, "m_rSprites")[1], "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprites")[1], "rotation", tRotation);
  setThePropOf(meProp(_me, "m_rSprites")[2], "loc", tloc);
  setThePropOf(meProp(_me, "m_rSprites")[2], "rotation", tRotation);
  if (tInvincible) {
  setThePropOf(meProp(_me, "m_rSprites")[1], "blend", 50);
  setThePropOf(meProp(_me, "m_rSprites")[2], "blend", 50);
  } else {
  setThePropOf(meProp(_me, "m_rSprites")[1], "blend", 100);
  setThePropOf(meProp(_me, "m_rSprites")[2], "blend", 100);
  }

  if (meProp(_me, "m_bMyShip")) {
  var tmember = undefined;
  if (lingoBinary("eq", meProp(_me, "m_iMyTeam"), 1)) {
  var tOffset = callNamed("integer", lingoBinary("mul", meProp(_me, "m_fReloadStatus"), meProp(_me, "m_ar_rMyShipRed").count));
  if (lingoBinary("lt", tOffset, 1)) {
  tOffset = 1;
  }

  tmember = meProp(_me, "m_ar_rMyShipRed")[tOffset];
  } else {
  tOffset = callNamed("integer", lingoBinary("mul", meProp(_me, "m_fReloadStatus"), meProp(_me, "m_ar_rMyShipBlue").count));
  if (lingoBinary("lt", tOffset, 1)) {
  tOffset = 1;
  }

  tmember = meProp(_me, "m_ar_rMyShipBlue")[tOffset];
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprites")[4].member, tmember)) {
  setThePropOf(meProp(_me, "m_rSprites")[4], "member", tmember);
  setThePropOf(meProp(_me, "m_rSprites")[4], "width", meProp(_me, "m_rSprites")[4].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[4], "height", meProp(_me, "m_rSprites")[4].member.height);
  }

  setThePropOf(meProp(_me, "m_rSprites")[4], "loc", callNamed("point", tloc.locH, lingoBinary("sub", tloc.locV, 55)));
  }

  if ((lingoTruthy(meProp(_me, "m_bOwnerWritten")) ? 0 : 1)) {
  var t_bNameOK = 1;
  var tWrName = lingoBinary("join", "ShipNameWriter", callMethod("GetNewReference", callMethod("getComponent", callNamed("getThread", "piratesminigame"))));
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 0, 0, 0), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", tWrName, tMetrics)
  var tWriter = callNamed("getWriter", tWrName);
  var tOwner = callMethod("GetParam", callMethod("getObject", _me), "Owner");
  var tImg = callNamed("image", 0, 0, 8);
  if (lingoBinary("neq", tOwner, -float(1))) {
  var t_rList = callMethod("getaProp", callMethod("GetParticipantlist", meProp(_me, "m_rMGE")), tOwner);
  if (callNamed("listp", t_rList)) {
  var tName = t_rList[symbol("name")];
  } else {
  tName = "";
  t_bNameOK = 0;
  }

  } else {
  var t_sPiratesName = callNamed("getText", "pirates_computer_player_name");
  switch (callNamed("integer", tTeam)) {
case 1:
  t_sPiratesName = callNamed("getText", "pirates_computer_player_name.1");
  break;
case 2:
  t_sPiratesName = callNamed("getText", "pirates_computer_player_name.2");
  break;
  }

  tName = t_sPiratesName;
  }

  if (lingoBinary("eq", t_iGameMode, 2)) {
  t_iGold = callMethod("GetParam", callMethod("getObject", _me), "Gold");
  tName = lingoBinary("join", lingoBinary("join", tName, "\r"), t_iGold);
  }

  tImg = callMethod("render", tWriter, tName);
  setThePropOf(meProp(_me, "m_rOwnerDisplayMember"), "image", tImg);
  setThePropOf(meProp(_me, "m_rSprites")[5], "member", meProp(_me, "m_rOwnerDisplayMember"));
  setThePropOf(meProp(_me, "m_rSprites")[5], "width", meProp(_me, "m_rSprites")[5].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[5], "height", meProp(_me, "m_rSprites")[5].member.height);
  setMeProp(_me, "m_sPlayerName", tName);
  callNamed("removeWriter", tWrName)
  if (t_bNameOK) {
  setMeProp(_me, "m_bOwnerWritten", 1);
  }

  }

  if (lingoBinary("eq", t_iGameMode, 1)) {
  if (lingoBinary("neq", tCarryingFlag, meProp(_me, "m_carryingFlag"))) {
  setMeProp(_me, "m_carryingFlag", tCarryingFlag);
  if (tCarryingFlag) {
  var t_iFlagIndex = 0;
  if (callNamed("TestBit", tstate, meProp(_me, "m_CARRYINGOWNFLAGBIT"))) {
  switch (meProp(_me, "m_iTeam")) {
case 1:
  t_iFlagIndex = 1;
  break;
case 2:
  t_iFlagIndex = 2;
  break;
  }

  }

  if (callNamed("TestBit", tstate, meProp(_me, "m_CARRYINGENEMYFLAGBIT"))) {
  switch (meProp(_me, "m_iTeam")) {
case 1:
  t_iFlagIndex = 2;
  break;
case 2:
  t_iFlagIndex = 1;
  break;
  }

  }

  if (lingoBinary("gt", t_iFlagIndex, 0)) {
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_rSprites")[7].member, meProp(_me, "m_ar_rFlags")[t_iFlagIndex])) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[7], "member", meProp(_me, "m_ar_rFlags")[t_iFlagIndex]);
  setThePropOf(meProp(_me, "m_rSprites")[7], "width", meProp(_me, "m_rSprites")[7].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[7], "height", meProp(_me, "m_rSprites")[7].member.height);
  }

  } else {
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_rSprites")[7].member, undefined)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[7], "member", undefined);
  }

  }

  } else {
  if ((lingoTruthy(lingoBinary("eq", meProp(_me, "m_rSprites")[7].member, undefined)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[7], "member", undefined);
  }

  }

  }

  }

  setThePropOf(meProp(_me, "m_rSprites")[5], "loc", callNamed("point", tloc.locH, lingoBinary("sub", tloc.locV, 55)));
  setThePropOf(meProp(_me, "m_rSprites")[7], "loc", callNamed("point", lingoBinary("sub", tloc.locH, 35), lingoBinary("sub", tloc.locV, 55)));
  var tFloatingWreck = callNamed("TestBit", tstate, meProp(_me, "m_FLOATINGWRECKBIT"));
  var tDestroyed = callNamed("TestBit", tstate, meProp(_me, "m_DESTROYEDBIT"));
  if (lingoBinary("and", (lingoTruthy(tFloatingWreck) ? 0 : 1), tDestroyed)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[4].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[4], "member", undefined);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[5].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[5], "member", undefined);
  }

  }

  if (lingoBinary("or", tFloatingWreck, tDestroyed)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[6].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[6], "member", undefined);
  }

  }

  setThePropOf(meProp(_me, "m_rSprites")[6], "loc", tloc);
  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_rSprites")[1], meProp(_me, "m_rSprites")[2], meProp(_me, "m_rSprites")[6]]), 0)
  callMethod("SprZToFixed", _me, new LingoList([meProp(_me, "m_rSprites")[4], meProp(_me, "m_rSprites")[5]]), callNamed("vector", 500, 500, 10000))
  setThePropOf(meProp(_me, "m_rSprites")[6], "locZ", lingoBinary("sub", meProp(_me, "m_rSprites")[6].locZ, 1));
  setThePropOf(meProp(_me, "m_rSprites")[2], "locZ", lingoBinary("add", meProp(_me, "m_rSprites")[1].locZ, 1));
  setGlobal("g_profShipVisualizerAcc", lingoBinary("add", globalVar("g_profShipVisualizerAcc"), lingoBinary("sub", theProperty("milliSeconds"), tTime)));
}

