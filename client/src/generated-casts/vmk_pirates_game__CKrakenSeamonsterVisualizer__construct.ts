// vmk_pirates_game.cct / CKrakenSeamonsterVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_sprites", new LingoList([]));
  var t_rSprite = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(t_rSprite, "member", callNamed("getMember", "seamonster_06"));
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  setThePropOf(t_rSprite, "ink", 36);
  setThePropOf(t_rSprite, "locZ", -float(49));
  callMethod("append", meProp(_me, "m_ar_sprites"), t_rSprite)
  t_rSprite = callNamed("sprite", callMethod("reserveSprite", callNamed("getSpriteManager"), callMethod("getID", _me)));
  setThePropOf(t_rSprite, "member", callNamed("getMember", "seamonster_06"));
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  setThePropOf(t_rSprite, "ink", 36);
  setThePropOf(t_rSprite, "locZ", -float(49));
  callMethod("append", meProp(_me, "m_ar_sprites"), t_rSprite)
  setMeProp(_me, "m_bMirror", 0);
  setMeProp(_me, "m_ATTACK_BIT", 1);
  var t_ar_frames_follow = new LingoList(["Kraken_warning_1", "Kraken_warning_2", "Kraken_warning_3", "Kraken_warning_4", "Kraken_warning_5"]);
  var t_ar_frames_back = new LingoList(["Kraken_back_1", "Kraken_back_2", "Kraken_back_3", "Kraken_back_3", "Kraken_back_4", "Kraken_back_5", "Kraken_back_6", "Kraken_back_7"]);
  var t_ar_frames_front = new LingoList(["Kraken_front_1", "Kraken_front_2", "Kraken_front_3", "Kraken_front_3", "Kraken_front_4", "Kraken_front_5", "Kraken_front_6", "Kraken_front_7", "Kraken_front_8", "Kraken_front_9"]);
  setMeProp(_me, "m_ar_frames_follow", new LingoList([]));
  setMeProp(_me, "m_ar_frames_front", new LingoList([]));
  setMeProp(_me, "m_ar_frames_back", new LingoList([]));
  setMeProp(_me, "m_iLastState", 0);
  var t_iSpeed = 3;
  for (var i = 1; i <= t_ar_frames_front.count; ++i) {
  var t_rMem = callNamed("getMember", t_ar_frames_front[i]);
  for (var k = 1; k <= t_iSpeed; ++k) {
  callMethod("append", meProp(_me, "m_ar_frames_front"), t_rMem)
  }

  }

  for (var i = 1; i <= t_ar_frames_back.count; ++i) {
  t_rMem = callNamed("getMember", t_ar_frames_back[i]);
  for (var k = 1; k <= t_iSpeed; ++k) {
  callMethod("append", meProp(_me, "m_ar_frames_back"), t_rMem)
  }

  }

  for (var i = 1; i <= t_ar_frames_follow.count; ++i) {
  t_rMem = callNamed("getMember", t_ar_frames_follow[i]);
  for (var k = 1; k <= t_iSpeed; ++k) {
  callMethod("append", meProp(_me, "m_ar_frames_follow"), t_rMem)
  }

  }

  setMeProp(_me, "m_iCurrentFrame", 1);
  setMeProp(_me, "m_vLocalPosition", undefined);
  return 1;
}

