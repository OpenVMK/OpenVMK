// vmk_pirates_minigame.cct / CPiratesVisualizerShip / SetGraphic

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
  var tNewGraphic = new LingoList([]);
  if ((lingoTruthy(tFloatingWreck) ? 0 : 1)) {
  tNewGraphic[1] = meProp(_me, "m_ar_shipMembers")[meProp(_me, "m_ar_dirToIndex")[a_iDir]];
  tNewGraphic[2] = meProp(_me, "m_ar_sailMembers")[a_iTeam][meProp(_me, "m_ar_dirToIndex")[a_iDir]];
  } else {
  tNewGraphic[1] = meProp(_me, "m_ar_sunkMembers")[meProp(_me, "m_ar_sunkDirToIndex")[a_iDir]];
  tNewGraphic[2] = undefined;
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
  }

  if (lingoBinary("neq", meProp(_me, "m_rSprites")[2].member, tNewGraphic[2])) {
  setThePropOf(meProp(_me, "m_rSprites")[2], "member", tNewGraphic[2]);
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

