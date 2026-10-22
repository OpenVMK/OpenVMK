// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / PrepareFx

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareFx(_me: LingoMe) {
  /* global */ var pTemp = globalVar("pTemp");
  if (lingoBinary("neq", _me.m_iMagicFx, 1)) {
  if (lingoBinary("neq", _me.m_iMagicFx, 19)) {
  if (lingoBinary("neq", _me.m_iMagicFx, 22)) {
  if (lingoBinary("neq", _me.m_iMagicFx, 23)) {
  if (lingoBinary("neq", _me.m_iMagicFx, 24)) {
  if (lingoBinary("eq", _me.m_iMagicFx, 28)) {
  var t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 10; ++i) {
  if (lingoBinary("lt", i, 10)) {
  var t_mem = callNamed("getMember", lingoBinary("join", "magic_pirate_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_pirate_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  var t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  }

  }

  }

  if (lingoBinary("eq", _me.m_iMagicFx, 2)) {
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 21; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_inferno_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_inferno_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  }

  }

  }

  if (lingoBinary("eq", _me.m_iMagicFx, 3)) {
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 14; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_fireworks_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_fireworks_", i));
  for (var e = 1; e <= 2; ++e) {
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  }

  }

  if (lingoBinary("eq", _me.m_iMagicFx, 4)) {
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 16; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 5)) {
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 2; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_ghost_0", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 6)) {
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 9; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_0", i));
  for (var e = 1; e <= 3; ++e) {
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 7)) {
  t_arFrameList = new LingoList([]);
  for (var i = 10; i <= 16; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_", i));
  for (var e = 1; e <= 3; ++e) {
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 8)) {
  t_arFrameList = new LingoList([]);
  for (var i = 0; i <= 10; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_fallingcoin_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_fallingcoin_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("loop"), 1)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 5; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_goldpile_BACK_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_mp_Framelist.back, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("back"), 1), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("back"), 1), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("back"), 1), symbol("loop"), 0)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 5; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_goldpile_FRONT_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("loop"), 0)
  t_arFrameList = new LingoList([]);
  t_mem = callNamed("getMember", "magic_glow");
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 0)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 9)) {
  t_arFrameList = new LingoList([]);
  i = 1;
  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("loop"), 1)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 45; ++i) {
  callMethod("add", t_arFrameList, undefined)
  }

  for (var i = 1; i <= 7; ++i) {
  callMethod("add", t_arFrameList, callNamed("getMember", "magic_lightning_1"))
  }

  for (var i = 1; i <= 8; ++i) {
  callMethod("add", t_arFrameList, callNamed("getMember", "magic_lightning_2"))
  }

  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("loop"), 1)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 4; ++i) {
  for (var e = 1; e <= 15; ++e) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_stormcloud_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 3), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 3), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 3), symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 10)) {
  t_arFrameList = new LingoList([callNamed("getMember", "magic_glow2")]);
  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 11)) {
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 12)) {
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 10; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowfall_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowfall_", i));
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("loop"), 1)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 12; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowman_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowman_", i));
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 2), symbol("loop"), 0)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 13)) {
  t_arFrameList = new LingoList([callNamed("getMember", "magic_trdet_glow")]);
  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 14)) {
  t_arFrameList = new LingoList([]);
  for (var i = 0; i <= 12; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsbk_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsbk_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_mp_Framelist.back, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("back"), 1), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("back"), 1), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("back"), 1), symbol("loop"), 1)
  for (var i = 0; i <= 12; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsfr_0", i));
  }

  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsfr_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_mp_Framelist.front, callNamed("propList"))
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("frames"), t_arFrameList)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("counter"), 0)
  callMethod("addProp", callNamed("getPropRef", _me.m_mp_Framelist, symbol("front"), 1), symbol("loop"), 1)
  t_arFrameList = new LingoList([callNamed("getMember", "magic_trdet_glow")]);
  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 32)) {
  t_arFrameList = new LingoList([callNamed("getMember", "lightningSpell_glow")]);
  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 35)) {
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 11; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_levitation_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", _me.m_ar_SpriteList, callNamed("propList"))
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("AnimCounter"), 1)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", _me.m_ar_SpriteList[1], symbol("loop"), 1)
  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

}

