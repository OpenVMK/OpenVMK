// vmk_pirates_game.cct / CWhirlpoolVisualizer / construct

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
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", "whirlpool_01"));
  setThePropOf(meProp(_me, "m_rSprite"), "ink", 33);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", lingoBinary("sub", callNamed("getVariableValue", "window.default.locz"), 103));
  setMeProp(_me, "m_ar_frames", new LingoList([callNamed("getMember", "whirlpool_01"), callNamed("getMember", "whirlpool_01"), callNamed("getMember", "whirlpool_01"), callNamed("getMember", "whirlpool_01"), callNamed("getMember", "whirlpool_02"), callNamed("getMember", "whirlpool_02"), callNamed("getMember", "whirlpool_02"), callNamed("getMember", "whirlpool_02"), callNamed("getMember", "whirlpool_03"), callNamed("getMember", "whirlpool_03"), callNamed("getMember", "whirlpool_03"), callNamed("getMember", "whirlpool_03"), callNamed("getMember", "whirlpool_04"), callNamed("getMember", "whirlpool_04"), callNamed("getMember", "whirlpool_04"), callNamed("getMember", "whirlpool_04"), callNamed("getMember", "whirlpool_05"), callNamed("getMember", "whirlpool_05"), callNamed("getMember", "whirlpool_05"), callNamed("getMember", "whirlpool_05"), callNamed("getMember", "whirlpool_06"), callNamed("getMember", "whirlpool_06"), callNamed("getMember", "whirlpool_06"), callNamed("getMember", "whirlpool_06"), callNamed("getMember", "whirlpool_07"), callNamed("getMember", "whirlpool_07"), callNamed("getMember", "whirlpool_07"), callNamed("getMember", "whirlpool_07"), callNamed("getMember", "whirlpool_08"), callNamed("getMember", "whirlpool_08"), callNamed("getMember", "whirlpool_08"), callNamed("getMember", "whirlpool_08")]));
  setMeProp(_me, "m_iFrame", 1);
  setMeProp(_me, "m_vLocalPosition", undefined);
  return 1;
}

