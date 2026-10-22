// vmk_pirates_game.cct / CPiratesInterface / HandleKeyDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleKeyDown(_me: LingoMe, a_iDirection: LingoValue) {
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
  if (callNamed("objectp", meProp(_me, "m_myShip"))) {
  if (lingoBinary("eq", a_iDirection, 2)) {
  if (callMethod("isCarryingFlag", callMethod("GetFactor", meProp(_me, "m_myShip")))) {
  callNamed("executeMessage", symbol("SendMinigameAction"), 8, new LingoList([]))
  }

  } else {
  if (lingoBinary("gt", callMethod("GetParam", meProp(_me, "m_myShip"), "Ammo").count, 0)) {
  if (lingoBinary("lt", a_iDirection, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_mp_shootState").state, symbol("left"))) {
  if (lingoBinary("gte", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_lastShoot")), meProp(_me, "m_shootDelay"))) {
  callNamed("executeMessage", symbol("SendMinigameAction"), 4, new LingoList([0]))
  setMeProp(_me, "m_lastShoot", theProperty("milliSeconds"));
  callMethod("PlayVoiceOverSeldom", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("fire"))
  }

  } else {
  if (lingoBinary("neq", meProp(_me, "m_mp_shootState").state, symbol("left"))) {
  callMethod("PlayPreshoot", callMethod("GetSoundPlayer", callMethod("getComponent", _me)))
  }

  setThePropOf(meProp(_me, "m_mp_shootState"), "state", symbol("left"));
  callMethod("MarkShoot", callMethod("GetVisual", meProp(_me, "m_myShip")), symbol("left"))
  }

  setThePropOf(meProp(_me, "m_mp_shootState"), "time", theProperty("milliSeconds"));
  } else {
  if (lingoBinary("gt", a_iDirection, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_mp_shootState").state, symbol("right"))) {
  if (lingoBinary("gte", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_lastShoot")), meProp(_me, "m_shootDelay"))) {
  callNamed("executeMessage", symbol("SendMinigameAction"), 4, new LingoList([1]))
  setMeProp(_me, "m_lastShoot", theProperty("milliSeconds"));
  callMethod("PlayVoiceOverSeldom", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("fire"))
  }

  } else {
  if (lingoBinary("neq", meProp(_me, "m_mp_shootState").state, symbol("right"))) {
  callMethod("PlayPreshoot", callMethod("GetSoundPlayer", callMethod("getComponent", _me)))
  }

  setThePropOf(meProp(_me, "m_mp_shootState"), "state", symbol("right"));
  callMethod("MarkShoot", callMethod("GetVisual", meProp(_me, "m_myShip")), symbol("right"))
  }

  setThePropOf(meProp(_me, "m_mp_shootState"), "time", theProperty("milliSeconds"));
  }

  }

  } else {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("OutOfAmmo"))
  }

  }

  }

  if ((lingoTruthy(callNamed("timeoutExists", "HideIdleWarning")) ? 0 : 1)) {
  callNamed("createTimeout", "HideIdleWarning", 700, symbol("HideIdleKickWarning"), callMethod("getID", _me), undefined, 1)
  }

}

