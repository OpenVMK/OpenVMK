// vmk_pirates_minigame.cct / CPiratesInterface / mouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseDown(_me: LingoMe, a_loc: LingoValue) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  if (callMethod("GameOn", callMethod("getComponent", _me))) {
  if (callMethod("inside", a_loc, callNamed("rect", 0, 0, theProperty("stage").image.width, lingoBinary("sub", theProperty("stage").image.height, 34)))) {
  callMethod("append", meProp(_me, "m_ar_lastClicks"), new LingoPropList([symbol("loc"), a_loc, symbol("time"), theProperty("milliSeconds")]))
  }

  }

}

