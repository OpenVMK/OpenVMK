// vmk_pirates2_minigame.cct / CPiratesVisualizerShip / SetGraphic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGraphic(_me: LingoMe, a_iMyObject: LingoValue, a_iDir: LingoValue, a_iTeam: LingoValue) {
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  var tFloatingWreck = callNamed("TestBit", callMethod("GetParam", a_iMyObject, "State"), meProp(_me, "m_FLOATINGWRECKBIT"));
  var tDestroyed = callNamed("TestBit", callMethod("GetParam", a_iMyObject, "State"), meProp(_me, "m_DESTROYEDBIT"));
  var tRowBoat = callNamed("TestBit", callMethod("GetParam", a_iMyObject, "State"), meProp(_me, "m_ROWINGBOATBIT"));
  var tNewGraphic = new LingoList([]);
  if (tFloatingWreck) {
  tNewGraphic[1] = meProp(_me, "m_ar_sunkMembers")[meProp(_me, "m_ar_sunkDirToIndex")[a_iDir]];
  tNewGraphic[2] = undefined;
  } else {
  if (tRowBoat) {
  tNewGraphic[1] = meProp(_me, "m_ar_rowboatMembers")[meProp(_me, "m_ar_rowboatdirToIndex")[a_iDir]][meProp(_me, "m_iRowboatCounter")];
  tNewGraphic[2] = meProp(_me, "m_ar_rowboatsailMembers")[meProp(_me, "m_ar_rowboatdirToIndex")[a_iDir]][meProp(_me, "m_iRowboatCounter")];
  setMeProp(_me, "m_iRowboatCounter", lingoBinary("add", meProp(_me, "m_iRowboatCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iRowboatCounter"), 4)) {
  setMeProp(_me, "m_iRowboatCounter", 1);
  }

  } else {
  tNewGraphic[1] = meProp(_me, "m_ar_shipMembers")[meProp(_me, "m_ar_dirToIndex")[a_iDir]];
  tNewGraphic[2] = meProp(_me, "m_ar_sailMembers")[a_iTeam][meProp(_me, "m_ar_dirToIndex")[a_iDir]];
  }

  }

  switch (meProp(_me, "m_yShootMark")) {
case symbol("left"):
  var tShootDir = callNamed("AdjustDirection", a_iDir, -float(90));
  if (lingoBinary("lt", tShootDir, 1)) {
  tShootDir = 360;
  }

  var tNewMember = meProp(_me, "m_ar_shootpntrMembers")[meProp(_me, "m_ar_dirToIndex")[tShootDir]];
  if (lingoBinary("and", lingoBinary("gte", meProp(_me, "m_unshake"), meProp(_me, "m_shakeProtection")), lingoBinary("neq", meProp(_me, "m_rSprites")[6].member, tNewMember))) {
  setThePropOf(meProp(_me, "m_rSprites")[6], "member", tNewMember);
  setThePropOf(meProp(_me, "m_rSprites")[6], "width", meProp(_me, "m_rSprites")[6].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[6], "height", meProp(_me, "m_rSprites")[6].member.height);
  }

  break;
case symbol("right"):
  tShootDir = callNamed("AdjustDirection", a_iDir, 90);
  if (lingoBinary("lt", tShootDir, 1)) {
  tShootDir = 360;
  }

  tNewMember = meProp(_me, "m_ar_shootpntrMembers")[meProp(_me, "m_ar_dirToIndex")[tShootDir]];
  if (lingoBinary("and", lingoBinary("gte", meProp(_me, "m_unshake"), meProp(_me, "m_shakeProtection")), lingoBinary("neq", meProp(_me, "m_rSprites")[6].member, tNewMember))) {
  setThePropOf(meProp(_me, "m_rSprites")[6], "member", tNewMember);
  setThePropOf(meProp(_me, "m_rSprites")[6], "width", meProp(_me, "m_rSprites")[6].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[6], "height", meProp(_me, "m_rSprites")[6].member.height);
  }

  break;
case symbol("none"):
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[6].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[6], "member", undefined);
  }

  break;
  }

  if (lingoBinary("and", lingoBinary("neq", tNewGraphic[1], meProp(_me, "m_lastGraphic")[1]), lingoBinary("neq", tNewGraphic[2], meProp(_me, "m_lastGraphic")[2]))) {
  if (lingoBinary("gte", meProp(_me, "m_unshake"), meProp(_me, "m_shakeProtection"))) {
  if (lingoBinary("neq", meProp(_me, "m_rSprites")[1].member, tNewGraphic[1])) {
  setThePropOf(meProp(_me, "m_rSprites")[1], "member", tNewGraphic[1]);
  setThePropOf(meProp(_me, "m_rSprites")[1], "width", meProp(_me, "m_rSprites")[1].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[1], "height", meProp(_me, "m_rSprites")[1].member.height);
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprites")[2].member, tNewGraphic[2])) {
  setThePropOf(meProp(_me, "m_rSprites")[2], "member", tNewGraphic[2]);
  setThePropOf(meProp(_me, "m_rSprites")[2], "width", meProp(_me, "m_rSprites")[2].member.width);
  setThePropOf(meProp(_me, "m_rSprites")[2], "height", meProp(_me, "m_rSprites")[2].member.height);
  }

  setMeProp(_me, "m_unshake", 1);
  }

  setMeProp(_me, "m_unshake", lingoBinary("add", meProp(_me, "m_unshake"), 1));
  }

  meProp(_me, "m_lastGraphic")[1] = meProp(_me, "m_rSprites")[1].member;
  meProp(_me, "m_lastGraphic")[2] = meProp(_me, "m_rSprites")[2].member;
  if (lingoBinary("and", (lingoTruthy(tFloatingWreck) ? 0 : 1), tDestroyed)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[1].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[1], "member", undefined);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprites")[2].member)) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rSprites")[2], "member", undefined);
  }

  }

}

