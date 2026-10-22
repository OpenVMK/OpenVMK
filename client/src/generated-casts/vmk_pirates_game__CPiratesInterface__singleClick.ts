// vmk_pirates_game.cct / CPiratesInterface / singleClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function singleClick(_me: LingoMe, a_loc: LingoValue) {
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
  var tTarget = callNamed("InverseAxonometricPosition", a_loc);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  var tdata = new LingoList([]);
  callMethod("append", tdata, callNamed("integer", tTarget.locH))
  callMethod("append", tdata, callNamed("integer", tTarget.locV))
  callNamed("executeMessage", symbol("SendMinigameAction"), 1, tdata)
  callMethod("PlayAcknowledge", callMethod("GetSoundPlayer", callMethod("getComponent", _me)))
  callMethod("PlayVoiceOverSeldom", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("Acknowledge"))
  }

  setThePropOf(meProp(_me, "m_rNavigationTargetSprite"), "loc", a_loc);
}

