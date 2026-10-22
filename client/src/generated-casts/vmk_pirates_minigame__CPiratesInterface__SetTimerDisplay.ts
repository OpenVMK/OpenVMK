// vmk_pirates_minigame.cct / CPiratesInterface / SetTimerDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTimerDisplay(_me: LingoMe, a_iSecondsLeft: LingoValue) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  if (lingoBinary("and", (lingoTruthy(meProp(_me, "m_iTimerBelow30")) ? 0 : 1), lingoBinary("lte", a_iSecondsLeft, 30))) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("TimeLow"))
  setMeProp(_me, "m_iTimerBelow30", 1);
  }

  if (lingoBinary("gt", a_iSecondsLeft, 30)) {
  setMeProp(_me, "m_iTimerBelow30", 0);
  }

  callMethod("show", meProp(_me, "m_rTimerDisplay"), a_iSecondsLeft)
}

