// vmk_pirates_minigame.cct / CPiratesInterface / dblClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dblClick(_me: LingoMe, a_loc: LingoValue) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  var tTarget = callNamed("InverseAxonometricPosition", a_loc);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  if (lingoBinary("and", lingoBinary("and", (lingoTruthy(callMethod("IsFloatingWreck", callMethod("GetFactor", meProp(_me, "m_myShip")))) ? 0 : 1), lingoBinary("gt", callMethod("GetParam", callMethod("getObject", meProp(_me, "m_myShip")), "Ammo"), 0)), lingoBinary("gte", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_lastShoot")), meProp(_me, "m_shootDelay")))) {
  var tDirectionVector = callMethod("GetDirectionVector", callMethod("GetFactor", meProp(_me, "m_myShip")));
  var tPos = callMethod("GetParam", meProp(_me, "m_myShip"), "WorldPosition");
  var tTestVector = lingoBinary("sub", callNamed("vector", tTarget.locH, tTarget.locV, 0), callNamed("vector", tPos.x, tPos.y, tPos.z));
  var tCross = callMethod("cross", tDirectionVector, tTestVector);
  if (lingoBinary("gt", tCross.z, float(0))) {
  callNamed("executeMessage", symbol("SendMinigameAction"), 4, new LingoList([1]))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  callMethod("MarkShoot", callMethod("GetVisual", meProp(_me, "m_myShip")), symbol("right"))
  }

  setThePropOf(meProp(_me, "m_mp_shootState"), "state", symbol("right"));
  setThePropOf(meProp(_me, "m_mp_shootState"), "time", theProperty("milliSeconds"));
  } else {
  callNamed("executeMessage", symbol("SendMinigameAction"), 4, new LingoList([0]))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  callMethod("MarkShoot", callMethod("GetVisual", meProp(_me, "m_myShip")), symbol("left"))
  }

  setThePropOf(meProp(_me, "m_mp_shootState"), "state", symbol("left"));
  setThePropOf(meProp(_me, "m_mp_shootState"), "time", theProperty("milliSeconds"));
  }

  setMeProp(_me, "m_lastShoot", theProperty("milliSeconds"));
  callMethod("PlayVoiceOverSeldom", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("fire"))
  }

  if (callMethod("IsFloatingWreck", callMethod("GetFactor", meProp(_me, "m_myShip")))) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("BlowShip"))
  callNamed("executeMessage", symbol("SendMinigameAction"), 6, new LingoList([]))
  }

  }

}

