// vmk_mystics.cct / CSoullessRenderer / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, _this: LingoValue, t_rSprite: LingoValue) {
  callNamed("trace", "Init soulless inferno renderer!")
  setThePropOf(_this, "m_rSprite", t_rSprite);
  setThePropOf(_this, "m_rAnimFrame", 0);
  setThePropOf(t_rSprite, "member", callNamed("member", "magic_soulless_1"));
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_rSprite.member.width, lingoBinary("div", _this.m_iTileSize, 32)));
  setThePropOf(t_rSprite, "height", lingoBinary("mul", t_rSprite.member.height, lingoBinary("div", _this.m_iTileSize, 32)));
}

