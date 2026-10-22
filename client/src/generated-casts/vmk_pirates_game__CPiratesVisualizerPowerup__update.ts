// vmk_pirates_game.cct / CPiratesVisualizerPowerup / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupAmmoGolden = globalVar("g_gfxPickupAmmoGolden");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  /* global */ var g_gfxPickupFlag1 = globalVar("g_gfxPickupFlag1");
  /* global */ var g_gfxPickupFlag2 = globalVar("g_gfxPickupFlag2");
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tTeam = callMethod("GetParam", callMethod("getObject", _me), "Team").value;
  var tdir = lingoBinary("add", callMethod("GetParam", callMethod("getObject", _me), "Direction"), 1);
  var ttype = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[1];
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[2];
  setMeProp(_me, "m_sineOffset2", lingoBinary("add", meProp(_me, "m_sineOffset2"), 0.03));
  if (lingoBinary("gt", meProp(_me, "m_sineOffset2"), lingoBinary("mul", float(2), callNamed("pi")))) {
  setMeProp(_me, "m_sineOffset2", float(0));
  }

  var tWaveOffset = lingoBinary("mul", callNamed("sin", lingoBinary("add", lingoBinary("div", tPos.x, 2300), meProp(_me, "m_sineOffset2"))), 100);
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("ProjectAxonometricPosition", callNamed("point", lingoBinary("add", tPos.x, tWaveOffset), lingoBinary("add", tPos.y, tWaveOffset))));
  if (lingoBinary("eq", ttype, 1)) {
  if (callNamed("TestBit", tstate, 1)) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_ammoGoldenGraphic"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_ammoGoldenGraphic"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  } else {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_ammoGraphic"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_ammoGraphic"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  }

  } else {
  if (lingoBinary("eq", ttype, 2)) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_healthGraphic"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_healthGraphic"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  } else {
  if (lingoBinary("eq", ttype, 3)) {
  if (lingoBinary("eq", tTeam, 1)) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_flagGraphic1"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_flagGraphic1"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  } else {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").member, meProp(_me, "m_flagGraphic2"))) {
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_flagGraphic2"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  }

  }

  }

  }

  }

  callMethod("SprZToScreenSpace", _me, new LingoList([meProp(_me, "m_rSprite")]), 0)
}

