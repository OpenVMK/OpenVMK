// d0e535313898676eb605277339b50f27.cct / CMagicFactor / PrepareFx

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareFx(_me: LingoMe) {
  switch (meProp(_me, "m_iMagicFx")) {
case 1:
case 19:
case 22:
case 23:
case 24:
case 28:
  var t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 10; ++i) {
  if (lingoBinary("lt", i, 10)) {
  var t_mem = callNamed("getMember", lingoBinary("join", "magic_pirate_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_pirate_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  var t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 2:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 21; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_inferno_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_inferno_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 3:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 14; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_fireworks_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_fireworks_", i));
  }

  for (var e = 1; e <= 2; ++e) {
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 4:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 16; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 5:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 2; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_ghost_0", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 6:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 9; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_0", i));
  for (var e = 1; e <= 3; ++e) {
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 7:
  t_arFrameList = new LingoList([]);
  for (var i = 10; i <= 16; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_teleport_", i));
  for (var e = 1; e <= 3; ++e) {
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 8:
  t_arFrameList = new LingoList([]);
  for (var i = 0; i <= 10; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_fallingcoin_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_fallingcoin_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("loop"), 1)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 5; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_goldpile_BACK_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").back, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").back[1], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").back[1], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").back[1], symbol("loop"), 0)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 5; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_goldpile_FRONT_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("loop"), 0)
  t_arFrameList = new LingoList([]);
  t_mem = callNamed("getMember", "magic_glow");
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 0)
  break;
case 9:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 6; ++i) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_tornado_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("loop"), 1)
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

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("loop"), 1)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 4; ++i) {
  for (var e = 1; e <= 15; ++e) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_stormcloud_", i));
  callMethod("add", t_arFrameList, t_mem)
  }

  }

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[3], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[3], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[3], symbol("loop"), 1)
  break;
case 10:
  t_arFrameList = new LingoList([callNamed("getMember", "magic_glow2")]);
  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 11:
  break;
case 12:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 10; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowfall_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowfall_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("loop"), 1)
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 12; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowman_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_snowman_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[2], symbol("loop"), 0)
  break;
case 13:
  t_arFrameList = new LingoList([callNamed("getMember", "magic_trdet_glow")]);
  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 14:
  t_arFrameList = new LingoList([]);
  for (var i = 0; i <= 12; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsbk_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsbk_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").back, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").back[1], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").back[1], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").back[1], symbol("loop"), 1)
  for (var i = 0; i <= 12; ++i) {
  if (lingoBinary("lt", i, 10)) {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsfr_0", i));
  } else {
  t_mem = callNamed("getMember", lingoBinary("join", "magic_trdet_coinsfr_", i));
  }

  callMethod("add", t_arFrameList, t_mem)
  }

  callMethod("add", meProp(_me, "m_mp_Framelist").front, new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("frames"), t_arFrameList)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("counter"), 0)
  callMethod("addProp", meProp(_me, "m_mp_Framelist").front[1], symbol("loop"), 1)
  t_arFrameList = new LingoList([callNamed("getMember", "magic_trdet_glow")]);
  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
case 27:
  t_arFrameList = new LingoList([callNamed("getMember", "lightningSpell_glow")]);
  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
// HAND-CORRECTED: Levitation (35), ported from a later build's CMagicFactor_new
// (cast 2230483a, 00010_CMagicFactor_new.ls). Disney's build has no case.
case 35:
  t_arFrameList = new LingoList([]);
  for (var i = 1; i <= 11; ++i) {
  callMethod("add", t_arFrameList, callNamed("getMember", lingoBinary("join", "magic_levitation_", i)))
  }
  callMethod("add", meProp(_me, "m_ar_SpriteList"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("AnimCounter"), 1)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("framelist"), t_arFrameList)
  t_rSpr = callNamed("sprite", callNamed("reserveSprite"));
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("sprite"), t_rSpr)
  callMethod("addProp", meProp(_me, "m_ar_SpriteList")[1], symbol("loop"), 1)
  break;
  break;
  break;
  break;
  break;
  break;
  }

}

