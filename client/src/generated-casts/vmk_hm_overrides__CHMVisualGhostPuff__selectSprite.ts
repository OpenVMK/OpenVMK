// vmk_hm_overrides.cct / CHMVisualGhostPuff / selectSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function selectSprite(_me: LingoMe) {
  if (lingoBinary("eq", callMethod("GetParam", callMethod("getObject", _me), "Team"), 1)) {
  setMeProp(_me, "m_iType", 1);
  setThePropOf(_me.m_rGlow, "member", callNamed("member", "greenGhost_glow"));
  } else {
  if (lingoBinary("eq", callMethod("GetParam", callMethod("getObject", _me), "Team"), 2)) {
  setMeProp(_me, "m_iType", 2);
  setThePropOf(_me.m_rGlow, "member", callNamed("member", "purpleGhost_glow"));
  }

  }

  if (callNamed("voidp", _me.m_rShadowSpr)) {
  setMeProp(_me, "m_rShadowSpr", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(_me.m_rShadowSpr, "member", callNamed("getMember", "room_avatar_shadow"));
  setThePropOf(_me.m_rShadowSpr, "ink", 39);
  setThePropOf(_me.m_rShadowSpr, "blend", 50);
  }

}

