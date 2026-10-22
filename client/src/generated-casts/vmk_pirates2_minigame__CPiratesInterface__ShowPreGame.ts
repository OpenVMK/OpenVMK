// vmk_pirates2_minigame.cct / CPiratesInterface / ShowPreGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowPreGame(_me: LingoMe) {
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
  if (callNamed("windowExists", meProp(_me, "m_sPreGameWndTitle"))) {
  return 1;
  }

  callNamed("createWindow", meProp(_me, "m_sPreGameWndTitle"), "vmk_pirates_modal.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPreGameWndTitle"));
  var tWnd = callNamed("getWindow", meProp(_me, "m_sPreGameWndTitle"));
  callMethod("merge", tWnd, "pirates_start.window")
  callMethod("center", tWnd)
  callMethod("hide", callMethod("getElement", tWnd, "pirates.dialog.hd"))
  callMethod("hide", callMethod("getElement", tWnd, "pirates.dialog.hd"))
  var t_rElem = callMethod("getElement", tWnd, "pirates.storyline.image");
  if (callNamed("objectp", t_rElem)) {
  callMethod("hide", t_rElem)
  }

}

