// vmk_pirates_game.cct / CPiratesVisualizerShip / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  setMeProp(_me, "m_rSprites", new LingoList([]));
  setMeProp(_me, "m_ar_rFlags", new LingoList([callNamed("getMember", "flag.picked.1"), callNamed("getMember", "flag.picked.2")]));
  meProp(_me, "m_rSprites")[1] = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(meProp(_me, "m_rSprites")[1], "member", undefined);
  setThePropOf(meProp(_me, "m_rSprites")[1], "ink", 36);
  setThePropOf(meProp(_me, "m_rSprites")[1], "locZ", -float(50));
  meProp(_me, "m_rSprites")[2] = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(meProp(_me, "m_rSprites")[2], "member", undefined);
  setThePropOf(meProp(_me, "m_rSprites")[2], "locZ", -float(49));
  setThePropOf(meProp(_me, "m_rSprites")[2], "ink", 41);
  setThePropOf(meProp(_me, "m_rSprites")[2], "bgColor", callNamed("rgb", "#FFEFBE"));
  setThePropOf(meProp(_me, "m_rSprites")[2], "color", callNamed("rgb", "#000000"));
  meProp(_me, "m_rSprites")[3] = undefined;
  meProp(_me, "m_rSprites")[4] = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(meProp(_me, "m_rSprites")[4], "member", undefined);
  setThePropOf(meProp(_me, "m_rSprites")[4], "ink", 36);
  setThePropOf(meProp(_me, "m_rSprites")[4], "locZ", -float(48));
  meProp(_me, "m_rSprites")[5] = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(meProp(_me, "m_rSprites")[5], "member", undefined);
  setThePropOf(meProp(_me, "m_rSprites")[5], "ink", 36);
  setThePropOf(meProp(_me, "m_rSprites")[5], "locZ", -float(48));
  meProp(_me, "m_rSprites")[6] = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(meProp(_me, "m_rSprites")[6], "member", undefined);
  setThePropOf(meProp(_me, "m_rSprites")[6], "ink", 36);
  setThePropOf(meProp(_me, "m_rSprites")[6], "locZ", -float(48));
  meProp(_me, "m_rSprites")[7] = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(meProp(_me, "m_rSprites")[7], "member", undefined);
  setThePropOf(meProp(_me, "m_rSprites")[7], "ink", 36);
  setThePropOf(meProp(_me, "m_rSprites")[7], "locZ", -float(48));
  setMeProp(_me, "m_ar_shipMembers", new LingoList([]));
  setMeProp(_me, "m_ar_sailMembers", new LingoList([new LingoList([]), new LingoList([]), new LingoList([]), new LingoList([])]));
  setMeProp(_me, "m_ar_shootpntrMembers", new LingoList([]));
  var t_rObject = callMethod("getObject", _me);
  if (callNamed("objectp", t_rObject)) {
  var t_iType = callMethod("GetParam", callMethod("getObject", _me), "Type");
  }

  setMeProp(_me, "m_iGold", 0);
  if (callNamed("voidp", t_iType)) {
  setMeProp(_me, "m_iType", 1);
  } else {
  setMeProp(_me, "m_iType", t_iType);
  }

  setMeProp(_me, "m_iTeam", 1);
  for (var i = 0; i <= 35; ++i) {
  var n = lingoBinary("mul", i, 10);
  var tsNumber = "";
  if (lingoBinary("lt", n, 100)) {
  tsNumber = lingoBinary("join", tsNumber, "0");
  }

  if (lingoBinary("lt", n, 10)) {
  tsNumber = lingoBinary("join", tsNumber, "0");
  }

  tsNumber = lingoBinary("join", tsNumber, n);
  var t_sName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "ship", "_"), meProp(_me, "m_iType")), "_"), tsNumber);
  var t_rMember = callNamed("getMember", t_sName);
  callMethod("append", meProp(_me, "m_ar_shipMembers"), t_rMember)
  callMethod("append", meProp(_me, "m_ar_sailMembers")[1], callNamed("getMember", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "sail", "_"), meProp(_me, "m_iType")), "_"), tsNumber)))
  callMethod("append", meProp(_me, "m_ar_sailMembers")[2], callNamed("getMember", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "sail", "_"), meProp(_me, "m_iType")), "_"), tsNumber)))
  callMethod("append", meProp(_me, "m_ar_shootpntrMembers"), callNamed("getMember", lingoBinary("join", "shoot0", tsNumber)))
  }

  setMeProp(_me, "m_ar_sunkMembers", new LingoList([]));
  meProp(_me, "m_ar_sunkMembers")[1] = callNamed("getMember", "sunk0000");
  meProp(_me, "m_ar_sunkMembers")[2] = callNamed("getMember", "sunk0020");
  meProp(_me, "m_ar_sunkMembers")[3] = callNamed("getMember", "sunk0045");
  meProp(_me, "m_ar_sunkMembers")[4] = callNamed("getMember", "sunk0070");
  meProp(_me, "m_ar_sunkMembers")[5] = callNamed("getMember", "sunk0090");
  meProp(_me, "m_ar_sunkMembers")[6] = callNamed("getMember", "sunk0110");
  meProp(_me, "m_ar_sunkMembers")[7] = callNamed("getMember", "sunk0130");
  meProp(_me, "m_ar_sunkMembers")[8] = callNamed("getMember", "sunk0155");
  meProp(_me, "m_ar_sunkMembers")[9] = callNamed("getMember", "sunk0180");
  meProp(_me, "m_ar_sunkMembers")[10] = callNamed("getMember", "sunk0205");
  meProp(_me, "m_ar_sunkMembers")[11] = callNamed("getMember", "sunk0225");
  meProp(_me, "m_ar_sunkMembers")[12] = callNamed("getMember", "sunk0245");
  meProp(_me, "m_ar_sunkMembers")[13] = callNamed("getMember", "sunk0265");
  meProp(_me, "m_ar_sunkMembers")[14] = callNamed("getMember", "sunk0295");
  meProp(_me, "m_ar_sunkMembers")[15] = callNamed("getMember", "sunk0320");
  meProp(_me, "m_ar_sunkMembers")[16] = callNamed("getMember", "sunk0340");
  setMeProp(_me, "m_ar_sunkDirToIndex", new LingoList([]));
  for (var i = 1; i <= 22; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 1;
  }

  for (var i = 23; i <= 45; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 2;
  }

  for (var i = 46; i <= 67; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 3;
  }

  for (var i = 68; i <= 90; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 4;
  }

  for (var i = 91; i <= 112; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 5;
  }

  for (var i = 113; i <= 135; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 6;
  }

  for (var i = 136; i <= 157; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 7;
  }

  for (var i = 158; i <= 180; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 8;
  }

  for (var i = 181; i <= 202; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 9;
  }

  for (var i = 203; i <= 225; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 10;
  }

  for (var i = 226; i <= 247; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 11;
  }

  for (var i = 248; i <= 270; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 12;
  }

  for (var i = 271; i <= 292; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 13;
  }

  for (var i = 293; i <= 315; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 14;
  }

  for (var i = 316; i <= 337; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 15;
  }

  for (var i = 338; i <= 360; ++i) {
  meProp(_me, "m_ar_sunkDirToIndex")[i] = 16;
  }

  setMeProp(_me, "m_ar_dirToIndex", new LingoList([]));
  for (var i = 1; i <= 360; ++i) {
  var tIndex = lingoBinary("add", lingoBinary("div", lingoBinary("sub", i, 5), 10), 1);
  if (lingoBinary("gt", tIndex, lingoBinary("mul", 5, 36))) {
  tIndex = lingoBinary("sub", tIndex, lingoBinary("mul", 5, 36));
  }

  if (lingoBinary("gt", tIndex, lingoBinary("mul", 4, 36))) {
  tIndex = lingoBinary("sub", tIndex, lingoBinary("mul", 4, 36));
  }

  if (lingoBinary("gt", tIndex, lingoBinary("mul", 3, 36))) {
  tIndex = lingoBinary("sub", tIndex, lingoBinary("mul", 3, 36));
  }

  if (lingoBinary("gt", tIndex, lingoBinary("mul", 2, 36))) {
  tIndex = lingoBinary("sub", tIndex, lingoBinary("mul", 2, 36));
  }

  if (lingoBinary("gt", tIndex, 36)) {
  tIndex = lingoBinary("sub", tIndex, 36);
  }

  if (lingoBinary("lt", tIndex, 1)) {
  tIndex = lingoBinary("sub", 36, tIndex);
  }

  callMethod("append", meProp(_me, "m_ar_dirToIndex"), tIndex)
  }

  setMeProp(_me, "m_iRowboatCounter", 1);
  setMeProp(_me, "m_ar_rowboatMembers", new LingoList([]));
  setMeProp(_me, "m_ar_rowboatsailMembers", new LingoList([]));
  setMeProp(_me, "m_ar_rowboatdirToIndex", new LingoList([]));
  var t_iAngle = 0;
  var t_iDivisions = 8;
  for (var i = 1; i <= t_iDivisions; ++i) {
  var t_sAngle = t_iAngle;
  if (lingoBinary("lt", t_iAngle, 10)) {
  t_sAngle = lingoBinary("join", "0", t_sAngle);
  }

  if (lingoBinary("lt", t_iAngle, 100)) {
  t_sAngle = lingoBinary("join", "0", t_sAngle);
  }

  var t_animation = new LingoList([]);
  var t_sailanimation = new LingoList([]);
  for (var k = 0; k <= 3; ++k) {
  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "ship_4_", t_sAngle), "_"), k);
  callMethod("append", t_animation, callNamed("getMember", t_sMemName))
  t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "ship_4_sail_", t_sAngle), "_"), k);
  callMethod("append", t_sailanimation, callNamed("getMember", t_sMemName))
  }

  callMethod("append", meProp(_me, "m_ar_rowboatMembers"), t_animation)
  callMethod("append", meProp(_me, "m_ar_rowboatsailMembers"), t_sailanimation)
  t_iAngle = lingoBinary("add", t_iAngle, lingoBinary("div", 360, t_iDivisions));
  }

  for (var i = 0; i <= 359; ++i) {
  var t_index = lingoBinary("add", lingoBinary("div", i, 45), 0.5);
  meProp(_me, "m_ar_rowboatdirToIndex")[lingoBinary("add", i, 1)] = t_index;
  }

  setMeProp(_me, "m_fReloadStatus", float(1));
  setMeProp(_me, "m_flashMember", callNamed("getMember", "red1"));
  setMeProp(_me, "m_ar_rMyShipRed", new LingoList([callNamed("getMember", "arrow.red_10"), callNamed("getMember", "arrow.red_25"), callNamed("getMember", "arrow.red_40"), callNamed("getMember", "arrow.red_55"), callNamed("getMember", "arrow.red_70"), callNamed("getMember", "arrow.red_85"), callNamed("getMember", "arrow.red_100")]));
  setMeProp(_me, "m_ar_rMyShipBlue", new LingoList([callNamed("getMember", "arrow.blue_10"), callNamed("getMember", "arrow.blue_25"), callNamed("getMember", "arrow.blue_40"), callNamed("getMember", "arrow.blue_55"), callNamed("getMember", "arrow.blue_70"), callNamed("getMember", "arrow.blue_85"), callNamed("getMember", "arrow.blue_100")]));
  setMeProp(_me, "m_bMyShip", 0);
  setMeProp(_me, "m_vLocalPosition", undefined);
  setMeProp(_me, "m_maxAcceleration", 180);
  setMeProp(_me, "m_maxDiff", 750);
  setMeProp(_me, "m_sineOffset1", float(0));
  setMeProp(_me, "m_sineOffset2", float(0));
  setMeProp(_me, "m_MOVEBIT", 1);
  setMeProp(_me, "m_SLOWBIT", 2);
  setMeProp(_me, "m_SHOOTBIT", 3);
  setMeProp(_me, "m_DESTROYEDBIT", 4);
  setMeProp(_me, "m_FLOATINGWRECKBIT", 5);
  setMeProp(_me, "m_INVINCIBILITYBIT", 6);
  setMeProp(_me, "m_CARRYINGOWNFLAGBIT", 7);
  setMeProp(_me, "m_ROWINGBOATBIT", 8);
  setMeProp(_me, "m_CARRYINGENEMYFLAGBIT", 9);
  setMeProp(_me, "m_carryingFlag", 0);
  setMeProp(_me, "m_shakeProtection", callNamed("getVariableValue", "visual.shipshakeprotection"));
  setMeProp(_me, "m_unshake", 1);
  setMeProp(_me, "m_lastGraphic", new LingoList([undefined, undefined]));
  setMeProp(_me, "m_rOwnerDisplayMember", callNamed("member", callNamed("createMember", lingoBinary("join", "ShipOwner", callMethod("GetNewReference", callMethod("getComponent", callNamed("getThread", "piratesminigame")))), symbol("bitmap"))));
  setMeProp(_me, "m_bOwnerWritten", 0);
  setMeProp(_me, "m_sPlayerName", "");
  setMeProp(_me, "m_rMGE", callMethod("getComponent", callNamed("getThread", "minigame")));
  return 1;
}

