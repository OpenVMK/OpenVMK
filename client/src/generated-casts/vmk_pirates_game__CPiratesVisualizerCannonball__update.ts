// vmk_pirates_game.cct / CPiratesVisualizerCannonball / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  /* global */ var g_profCannonballVisualizerAcc = globalVar("g_profCannonballVisualizerAcc");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbGolden = globalVar("g_gfxCbGolden");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  var tTime = theProperty("milliSeconds");
  var tMyObject = callMethod("getObject", _me);
  var tLastMove = callMethod("GetParam", tMyObject, "LastMove");
  var tDt = lingoBinary("div", lingoBinary("sub", tTime, tLastMove), float(1000));
  var tGameParams = callMethod("GetParam", tMyObject, "GameParams");
  var tVelocity = callNamed("intvector", tGameParams[2], tGameParams[3], 0);
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  if (callMethod("getSyncState", meProp(_me, "m_rMGE"))) {
  tPos = callMethod("add", tPos, callMethod("multiply", tVelocity, lingoBinary("div", tDt, callMethod("GetSubturnSpacing", meProp(_me, "m_rMGE")))));
  }

  var tloc = callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", tloc);
  var tstate = callMethod("GetParam", tMyObject, "GameParams")[5];
  if (callNamed("TestBit", tstate, meProp(_me, "m_BIT_INVINCIBLE"))) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_rInvincibleMember"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_rInvincibleMember"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  } else {
  if (callNamed("TestBit", tstate, meProp(_me, "m_BIT_SHRAPNEL"))) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_rShrapnelMember"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_rShrapnelMember"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  } else {
  if (callNamed("TestBit", tstate, meProp(_me, "m_BIT_BROADSIDE"))) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_rBroadsideMember"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_rBroadsideMember"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  } else {
  if (callNamed("TestBit", tstate, meProp(_me, "m_BIT_GOLDEN"))) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_rGoldenMember"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_rGoldenMember"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  }

  }

  }

  }

  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_rSprite")]), 0)
  setGlobal("g_profCannonballVisualizerAcc", lingoBinary("add", globalVar("g_profCannonballVisualizerAcc"), lingoBinary("sub", theProperty("milliSeconds"), tTime)));
}

