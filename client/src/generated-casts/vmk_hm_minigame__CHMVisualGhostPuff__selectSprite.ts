// vmk_hm_minigame.cct / CHMVisualGhostPuff / selectSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function selectSprite(_me: LingoMe) {
  switch (callMethod("GetParam", callMethod("getObject", _me), "Team")) {
case 1:
  setMeProp(_me, "m_iType", 1);
  setThePropOf(meProp(_me, "m_rGlow"), "member", callNamed("member", "greenGhost_glow"));
  break;
case 2:
  setMeProp(_me, "m_iType", 2);
  setThePropOf(meProp(_me, "m_rGlow"), "member", callNamed("member", "purpleGhost_glow"));
  break;
  }

  if (callNamed("voidp", meProp(_me, "m_rShadowSpr"))) {
  setMeProp(_me, "m_rShadowSpr", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "member", callNamed("getMember", "room_avatar_shadow"));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "ink", 39);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "blend", 50);
  }

}

