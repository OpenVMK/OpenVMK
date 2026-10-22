// vmk_pirates_minigame.cct / CPiratesInterface / UncompressGraphics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UncompressGraphics(_me: LingoMe) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  var temp = callNamed("getMember", "sunk0000").image;
  temp = callNamed("getMember", "sunk0020").image;
  temp = callNamed("getMember", "sunk0045").image;
  temp = callNamed("getMember", "sunk0070").image;
  temp = callNamed("getMember", "sunk0090").image;
  temp = callNamed("getMember", "sunk0110").image;
  temp = callNamed("getMember", "sunk0130").image;
  temp = callNamed("getMember", "sunk0155").image;
  temp = callNamed("getMember", "sunk0180").image;
  temp = callNamed("getMember", "sunk0205").image;
  temp = callNamed("getMember", "sunk0225").image;
  temp = callNamed("getMember", "sunk0245").image;
  temp = callNamed("getMember", "sunk0265").image;
  temp = callNamed("getMember", "sunk0295").image;
  temp = callNamed("getMember", "sunk0320").image;
  temp = callNamed("getMember", "sunk0340").image;
  for (var i = 0; i <= 35; ++i) {
  var n = lingoBinary("mul", i, 10);
  var tsNumber = "0";
  if (lingoBinary("lt", n, 100)) {
  tsNumber = lingoBinary("join", tsNumber, "0");
  }

  if (lingoBinary("lt", n, 10)) {
  tsNumber = lingoBinary("join", tsNumber, "0");
  }

  tsNumber = lingoBinary("join", tsNumber, n);
  temp = callNamed("getMember", lingoBinary("join", "ship", tsNumber)).image;
  temp = callNamed("getMember", lingoBinary("join", "redsail", tsNumber)).image;
  temp = callNamed("getMember", lingoBinary("join", "bluesail", tsNumber)).image;
  }

  temp = callNamed("getMember", "cannonball_shrapnel").image;
  temp = callNamed("getMember", "cannonball_invincible").image;
  temp = callNamed("getMember", "cannonball_broadside").image;
  temp = callNamed("getMember", "health.pickup").image;
  temp = callNamed("getMember", "ammo.pickup").image;
  temp = callNamed("getMember", "moonbeam").image;
  for (var tFrame of callNamed("getVariableValue", "puff").framelist.toArray()) {
  temp = callNamed("getMember", tFrame).image;
  }

  for (var tFrame of callNamed("getVariableValue", "explosion").framelist.toArray()) {
  temp = callNamed("getMember", tFrame).image;
  }

  for (var tFrame of callNamed("getVariableValue", "splash").framelist.toArray()) {
  temp = callNamed("getMember", tFrame).image;
  }

  var t_ar_sFireAnim = new LingoList(["fire_01", "fire_02", "fire_03", "fire_04", "fire_05", "fire_06", "fire_07", "fire_08", "fire_09", "fire_10", "fire_11", "fire_12", "fire_13", "fire_14", "fire_15"]);
  for (var tFrame of t_ar_sFireAnim.toArray()) {
  temp = callNamed("getMember", tFrame).image;
  }

  temp = callNamed("getMember", "oilspill").image;
  temp = callNamed("getMember", "arrow.blue_10").image;
  temp = callNamed("getMember", "arrow.blue_25").image;
  temp = callNamed("getMember", "arrow.blue_40").image;
  temp = callNamed("getMember", "arrow.blue_55").image;
  temp = callNamed("getMember", "arrow.blue_70").image;
  temp = callNamed("getMember", "arrow.blue_85").image;
  temp = callNamed("getMember", "arrow.blue_100").image;
  temp = callNamed("getMember", "arrow.red_10").image;
  temp = callNamed("getMember", "arrow.red_25").image;
  temp = callNamed("getMember", "arrow.red_40").image;
  temp = callNamed("getMember", "arrow.red_55").image;
  temp = callNamed("getMember", "arrow.red_70").image;
  temp = callNamed("getMember", "arrow.red_85").image;
  temp = callNamed("getMember", "arrow.red_100").image;
}

