// vmk_pirates2_minigame.cct / CPiratesInterface / UnprepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareRoom(_me: LingoMe) {
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
  if (meProp(_me, "m_prepared")) {
  setTheProperty("mouseDownScript", meProp(_me, "m_mousedownscript"));
  callNamed("removeUpdate", callMethod("getID", _me))
  callNamed("executeMessage", symbol("ui_show"))
  callNamed("releaseSprite", meProp(_me, "m_rNavigationTargetSprite").spriteNum)
  callNamed("releaseSprite", meProp(_me, "m_rGraphicCursorSprite").spriteNum)
  callNamed("releaseSprite", meProp(_me, "m_rPrepareSplashSprite").spriteNum)
  callNamed("releaseSprite", meProp(_me, "m_rPrepareSplashBgSprite").spriteNum)
  callMethod("RemoveMessageBar", _me)
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rTimerDisplay"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rTimerDisplay")))
  }

  if (callMethod("MidstageWindowExists", _me)) {
  callMethod("RemoveMidstageWindow", _me)
  }

  callMethod("HideIdleKickWarning", _me)
  setMeProp(_me, "m_prepared", 0);
  }

}

