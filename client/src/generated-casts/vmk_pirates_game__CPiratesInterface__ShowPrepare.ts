// vmk_pirates_game.cct / CPiratesInterface / ShowPrepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowPrepare(_me: LingoMe, a_iTimeRemaining: LingoValue) {
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
  setThePropOf(meProp(_me, "m_rPrepareSplashBgSprite"), "member", callNamed("member", "pirates.start.bg"));
  setThePropOf(meProp(_me, "m_rPrepareSplashBgSprite"), "width", callNamed("member", "pirates.start.bg").image.width);
  setThePropOf(meProp(_me, "m_rPrepareSplashBgSprite"), "height", callNamed("member", "pirates.start.bg").image.height);
  if (lingoBinary("lt", a_iTimeRemaining, 5)) {
  if (lingoBinary("gt", a_iTimeRemaining, 3)) {
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "member", callNamed("member", "pirates.start.3"));
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "width", callNamed("member", "pirates.start.3").image.width);
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "height", callNamed("member", "pirates.start.3").image.height);
  if (lingoBinary("neq", meProp(_me, "m_prepareLastShow"), 3)) {
  callMethod("PlayCountDown", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), 1)
  }

  setMeProp(_me, "m_prepareLastShow", 3);
  } else {
  if (lingoBinary("gt", a_iTimeRemaining, 2)) {
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "member", callNamed("member", "pirates.start.2"));
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "width", callNamed("member", "pirates.start.2").image.width);
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "height", callNamed("member", "pirates.start.2").image.height);
  if (lingoBinary("neq", meProp(_me, "m_prepareLastShow"), 2)) {
  callMethod("PlayCountDown", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), 2)
  }

  setMeProp(_me, "m_prepareLastShow", 2);
  } else {
  if (lingoBinary("gt", a_iTimeRemaining, 1)) {
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "member", callNamed("member", "pirates.start.1"));
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "width", callNamed("member", "pirates.start.1").image.width);
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "height", callNamed("member", "pirates.start.1").image.height);
  if (lingoBinary("neq", meProp(_me, "m_prepareLastShow"), 1)) {
  callMethod("PlayCountDown", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), 3)
  }

  setMeProp(_me, "m_prepareLastShow", 1);
  } else {
  if (lingoBinary("gte", a_iTimeRemaining, 0)) {
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "member", callNamed("member", "pirates.start.fight"));
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "width", callNamed("member", "pirates.start.fight").image.width);
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "height", callNamed("member", "pirates.start.fight").image.height);
  if (lingoBinary("neq", meProp(_me, "m_prepareLastShow"), 0)) {
  callMethod("PlayCountDown", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), 4)
  }

  setMeProp(_me, "m_prepareLastShow", 0);
  } else {
  setMeProp(_me, "m_prepareLastShow", 5);
  }

  }

  }

  }

  }

}

