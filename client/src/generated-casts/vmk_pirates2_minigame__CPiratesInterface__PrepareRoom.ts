// vmk_pirates2_minigame.cct / CPiratesInterface / PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareRoom(_me: LingoMe) {
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
  callNamed("executeMessage", symbol("HidePPSInterface"))
  callMethod("UncompressGraphics", _me)
  setGlobal("g_gfxCbFire", callNamed("getMember", "cannonball_shrapnel"));
  setGlobal("g_gfxCbWhite", callNamed("getMember", "cannonball_invincible"));
  setGlobal("g_gfxCbRed", callNamed("getMember", "cannonball_broadside"));
  setGlobal("g_gfxCbNormal", callNamed("getMember", "cannonball"));
  setGlobal("g_gfxCbGolden", callNamed("getMember", "cannonball_golden"));
  setGlobal("g_gfxPickupAmmo", callNamed("getMember", "ammo.pickup"));
  setGlobal("g_gfxPickupAmmoGolden", callNamed("getMember", "golden.pickup"));
  setGlobal("g_gfxPickupHealth", callNamed("getMember", "health.pickup"));
  setGlobal("g_gfxPickupFlag1", callNamed("getMember", "flag.pickup.1"));
  setGlobal("g_gfxPickupFlag2", callNamed("getMember", "flag.pickup.2"));
  var m_lastClick = undefined;
  setMeProp(_me, "m_navigatableCursor", callNamed("getMember", "can_move"));
  setMeProp(_me, "m_shootableCursor", callNamed("getMember", "can_move_and_shoot"));
  setMeProp(_me, "m_rNavigationTargetSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rNavigationTargetSprite"), "member", callNamed("getMember", "heading_towards"));
  setThePropOf(meProp(_me, "m_rNavigationTargetSprite"), "locZ", lingoBinary("sub", callNamed("getVariableValue", "window.default.locz"), 102));
  setThePropOf(meProp(_me, "m_rNavigationTargetSprite"), "loc", callNamed("point", 1000, 1000));
  setThePropOf(meProp(_me, "m_rNavigationTargetSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rNavigationTargetSprite"), "width", callNamed("getMember", "heading_towards").image.width);
  setThePropOf(meProp(_me, "m_rNavigationTargetSprite"), "height", callNamed("getMember", "heading_towards").image.height);
  setMeProp(_me, "m_rGraphicCursorSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "locZ", lingoBinary("sub", callNamed("getVariableValue", "window.default.locz"), 102));
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "ink", 36);
  setMeProp(_me, "m_rPrepareSplashBgSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rPrepareSplashBgSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rPrepareSplashBgSprite"), "ink", 33);
  setThePropOf(meProp(_me, "m_rPrepareSplashBgSprite"), "locZ", lingoBinary("sub", callNamed("getVariableValue", "window.default.locz"), 2));
  setThePropOf(meProp(_me, "m_rPrepareSplashBgSprite"), "loc", callNamed("point", lingoBinary("div", theProperty("stage").image.width, 2), lingoBinary("div", theProperty("stage").image.height, 2)));
  setMeProp(_me, "m_rPrepareSplashSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "locZ", lingoBinary("sub", callNamed("getVariableValue", "window.default.locz"), 1));
  setThePropOf(meProp(_me, "m_rPrepareSplashSprite"), "loc", callNamed("point", lingoBinary("div", theProperty("stage").image.width, 2), lingoBinary("div", theProperty("stage").image.height, 2)));
  callNamed("executeMessage", symbol("ui_hide"))
  setMeProp(_me, "m_piratesBar", callNamed("createObject", "Pirates Chat", "CPiratesMessageBar"));
  setMeProp(_me, "m_bMessageBarInitialized", 0);
  setMeProp(_me, "m_iTimerBelow30", 0);
  setMeProp(_me, "m_mousedownscript", theProperty("mouseDownScript"));
  setTheProperty("mouseDownScript", "PiratesMouseDown");
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_myShip", undefined);
  setMeProp(_me, "m_mp_shootState", new LingoPropList([symbol("state"), symbol("none"), symbol("time"), theProperty("milliSeconds")]));
  setMeProp(_me, "m_bKeyIsDown", 0);
  setMeProp(_me, "m_iBootResetTimer", theProperty("milliSeconds"));
  setMeProp(_me, "m_prepared", 1);
}

