// vmk_pirates_minigame.cct / CPiratesVisualizerPowerup / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  setMeProp(_me, "m_rSprite", callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", -float(51));
  setMeProp(_me, "m_healthGraphic", globalVar("g_gfxPickupHealth"));
  setMeProp(_me, "m_ammoGraphic", globalVar("g_gfxPickupAmmo"));
  setMeProp(_me, "m_vLocalPosition", undefined);
  return 1;
}

