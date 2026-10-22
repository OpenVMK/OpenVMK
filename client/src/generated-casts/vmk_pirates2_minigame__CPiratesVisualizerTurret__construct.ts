// vmk_pirates2_minigame.cct / CPiratesVisualizerTurret / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSprite", callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", "turret_island"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", -float(51));
  setMeProp(_me, "m_rFlameSprite", callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rFlameSprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_rFlameSprite"), "ink", 36);
  setThePropOf(meProp(_me, "m_rFlameSprite"), "locZ", -float(50));
  setMeProp(_me, "m_vLocalPosition", undefined);
  setMeProp(_me, "m_flameMember", callNamed("getmemnum", "turret_1_damage"));
  return 1;
}

