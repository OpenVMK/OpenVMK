// vmk_hm_minigame.cct / CHMPlayerStatus / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, avatarName: LingoValue, i_iTeam: LingoValue) {
  var t_sOwnName = callMethod("get", callNamed("getObject", symbol("session")), "name");
  if (lingoBinary("eq", t_sOwnName, avatarName)) {
  for (var i = 0; i <= 7; ++i) {
  var t_rSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSprite, "member", undefined);
  setThePropOf(t_rSprite, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSprite, "locZ", 0);
  setThePropOf(t_rSprite, "ink", 36);
  setThePropOf(t_rSprite, "member", callNamed("member", lingoBinary("join", "arrow_key_b_", i)));
  setThePropOf(t_rSprite, "width", callNamed("member", lingoBinary("join", "arrow_key_b_", i)).image.width);
  setThePropOf(t_rSprite, "height", callNamed("member", lingoBinary("join", "arrow_key_b_", i)).image.height);
  callMethod("append", meProp(_me, "m_ar_arrows"), t_rSprite)
  }

  t_rSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSprite, "member", undefined);
  setThePropOf(t_rSprite, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSprite, "locZ", 0);
  setThePropOf(t_rSprite, "ink", 36);
  setThePropOf(t_rSprite, "member", callNamed("member", "ring"));
  setThePropOf(t_rSprite, "width", callNamed("member", "ring").image.width);
  setThePropOf(t_rSprite, "height", callNamed("member", "ring").image.height);
  setThePropOf(t_rSprite, "visible", 0);
  callMethod("append", meProp(_me, "m_ar_arrows"), t_rSprite)
  t_rSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSprite, "member", undefined);
  setThePropOf(t_rSprite, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSprite, "locZ", 0);
  setThePropOf(t_rSprite, "ink", 36);
  if (lingoBinary("eq", i_iTeam, 1)) {
  setThePropOf(t_rSprite, "member", callNamed("member", "hm_arrow_green"));
  } else {
  setThePropOf(t_rSprite, "member", callNamed("member", "hm_arrow_purple"));
  }

  setThePropOf(t_rSprite, "width", t_rSprite.member.image.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.image.height);
  meProp(_me, "m_ar_teams")[symbol("arrow")] = new LingoList([t_rSprite]);
  }

  var t_rMember = callNamed("member", callNamed("createMember", lingoBinary("join", avatarName, "_name.status"), symbol("text")));
  setThePropOf(t_rMember, "fontSize", 12);
  setThePropOf(t_rMember, "font", "Arial");
  setThePropOf(t_rMember, "text", avatarName);
  setThePropOf(t_rMember, "color", callNamed("rgb", "#efefef"));
  setThePropOf(t_rMember, "alignment", symbol("center"));
  setThePropOf(t_rMember, "rect", callNamed("rect", 0, 0, 100, 16));
  setThePropOf(t_rMember, "regPoint", callNamed("point", 50, 0));
  t_rSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSprite, "member", undefined);
  setThePropOf(t_rSprite, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSprite, "locZ", 0);
  setThePropOf(t_rSprite, "ink", 36);
  setThePropOf(t_rSprite, "member", t_rMember);
  setThePropOf(t_rSprite, "width", t_rSprite.member.image.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.image.height);
  meProp(_me, "m_ar_teams")[symbol("name")] = new LingoList([t_rSprite, t_rMember]);
  t_rSprite = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSprite, "member", undefined);
  setThePropOf(t_rSprite, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSprite, "locZ", 0);
  setThePropOf(t_rSprite, "ink", 36);
  setThePropOf(t_rSprite, "member", callNamed("member", "hm_status_bar"));
  setThePropOf(t_rSprite, "width", t_rSprite.member.image.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.image.height);
  var t_rSpriteColor = callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me)));
  setThePropOf(t_rSpriteColor, "member", undefined);
  setThePropOf(t_rSpriteColor, "loc", callNamed("point", -float(1000), -float(1000)));
  setThePropOf(t_rSpriteColor, "locZ", 0);
  setThePropOf(t_rSpriteColor, "ink", 36);
  if (lingoBinary("eq", i_iTeam, 1)) {
  setThePropOf(t_rSpriteColor, "member", callNamed("member", "hm_status_purple"));
  } else {
  setThePropOf(t_rSpriteColor, "member", callNamed("member", "hm_status_green"));
  }

  setThePropOf(t_rSprite, "visible", 0);
  setThePropOf(t_rSpriteColor, "visible", 0);
  meProp(_me, "m_ar_teams")[symbol("bar")] = new LingoList([t_rSprite, t_rSpriteColor]);
}

