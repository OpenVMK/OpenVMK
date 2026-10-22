// vmk_pirates_game.cct / CPiratesInterface / showStoryLine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showStoryLine(_me: LingoMe, a_sStage: LingoValue) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbGolden = globalVar("g_gfxCbGolden");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupAmmoGolden = globalVar("g_gfxPickupAmmoGolden");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  /* global */ var g_gfxPickupFlag1 = globalVar("g_gfxPickupFlag1");
  /* global */ var g_gfxPickupFlag2 = globalVar("g_gfxPickupFlag2");
  var tWnd = callNamed("getWindow", meProp(_me, "m_sPreGameWndTitle"));
  if (callNamed("objectp", tWnd)) {
  var t_rElem = callMethod("getElement", tWnd, "pirates.storyline.image");
  if (callNamed("objectp", t_rElem)) {
  var t_rSprite = callMethod("getProperty", t_rElem, symbol("sprite"));
  switch (1) {
case lingoBinary("contains", a_sStage, "level1"):
  setThePropOf(t_rSprite, "member", callNamed("member", "storyline.level1"));
  callMethod("show", t_rElem)
  break;
case lingoBinary("contains", a_sStage, "level2"):
  setThePropOf(t_rSprite, "member", callNamed("member", "storyline.level2"));
  callMethod("show", t_rElem)
  break;
case lingoBinary("contains", a_sStage, "level3"):
  setThePropOf(t_rSprite, "member", callNamed("member", "storyline.level3"));
  callMethod("show", t_rElem)
  break;
  }

  }

  }

}

