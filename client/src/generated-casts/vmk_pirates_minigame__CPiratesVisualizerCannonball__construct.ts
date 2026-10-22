// vmk_pirates_minigame.cct / CPiratesVisualizerCannonball / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_profCannonballVisualizerAcc = globalVar("g_profCannonballVisualizerAcc");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSprite"), "member", globalVar("g_gfxCbNormal"));
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", -float(49));
  setMeProp(_me, "m_BIT_INVINCIBLE", 1);
  setMeProp(_me, "m_BIT_BROADSIDE", 2);
  setMeProp(_me, "m_BIT_SHRAPNEL", 3);
  setMeProp(_me, "m_rShrapnelMember", globalVar("g_gfxCbFire"));
  setMeProp(_me, "m_rInvincibleMember", globalVar("g_gfxCbWhite"));
  setMeProp(_me, "m_rBroadsideMember", globalVar("g_gfxCbRed"));
  setMeProp(_me, "m_rMGE", callMethod("getComponent", callNamed("getThread", "minigame")));
  return 1;
}

