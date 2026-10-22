// vmk_pirates_game.cct / COilVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_sprite"), "member", undefined);
  setThePropOf(meProp(_me, "m_sprite"), "locZ", -float(45));
  setThePropOf(meProp(_me, "m_sprite"), "loc", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "m_sprite"), "member", callNamed("member", "oilspill"));
  setThePropOf(meProp(_me, "m_sprite"), "width", meProp(_me, "m_sprite").member.width);
  setThePropOf(meProp(_me, "m_sprite"), "height", meProp(_me, "m_sprite").member.height);
  var t_ar_sFireAnim = new LingoList(["fire_01", "fire_02", "fire_03", "fire_04", "fire_05", "fire_06", "fire_07", "fire_08", "fire_09", "fire_10", "fire_11", "fire_12", "fire_13", "fire_14", "fire_15"]);
  setMeProp(_me, "m_ar_rFireAnim", new LingoList([]));
  for (var tFrame of t_ar_sFireAnim.toArray()) {
  callMethod("append", meProp(_me, "m_ar_rFireAnim"), callNamed("getMember", tFrame))
  }

  setMeProp(_me, "m_ar_mp_Flames", new LingoList([]));
  for (var i = 1; i <= 3; ++i) {
  callMethod("append", meProp(_me, "m_ar_mp_Flames"), new LingoPropList([symbol("Spr"), callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))), symbol("frame"), callNamed("random", t_ar_sFireAnim.count)]))
  }

  return 1;
}

