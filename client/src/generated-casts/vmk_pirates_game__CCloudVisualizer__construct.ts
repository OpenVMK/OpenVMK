// vmk_pirates_game.cct / CCloudVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", "cloud_day"));
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", -float(40));
  setThePropOf(meProp(_me, "m_rSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_rSprite"), "width", 160);
  setThePropOf(meProp(_me, "m_rSprite"), "height", 80);
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 0);
  setMeProp(_me, "m_rShadowSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rShadowSprite"), "member", callNamed("getMember", "cloud_day_shadow"));
  setThePropOf(meProp(_me, "m_rShadowSprite"), "locZ", -float(51));
  setThePropOf(meProp(_me, "m_rShadowSprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_rShadowSprite"), "width", 160);
  setThePropOf(meProp(_me, "m_rShadowSprite"), "height", 80);
  setThePropOf(meProp(_me, "m_rShadowSprite"), "ink", 0);
  return 1;
}

