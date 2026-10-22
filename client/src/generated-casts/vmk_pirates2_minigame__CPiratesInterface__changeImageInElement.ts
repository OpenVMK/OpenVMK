// vmk_pirates2_minigame.cct / CPiratesInterface / changeImageInElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeImageInElement(_me: LingoMe, tWndObj: LingoValue, tElemName: LingoValue, tmember: LingoValue) {
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
  if (callNamed("objectp", tWndObj)) {
  var tElem = callMethod("getElement", tWndObj, tElemName);
  if (lingoBinary("neq", tElem, 0)) {
  var tSprite = callMethod("getProperty", tElem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "ink", 36);
  setThePropOf(tSprite.member, "image", tmember.image);
  setThePropOf(tSprite.member, "regPoint", tmember.regPoint);
  setThePropOf(tSprite, "width", tmember.width);
  setThePropOf(tSprite, "height", tmember.height);
  }

  }

  }

}

