// vmk_mystics.cct / CLetItGoRenderer / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, _this: LingoValue, t_rSprite: LingoValue) {
  callNamed("trace", "Init let it go renderer!")
  setThePropOf(_this, "m_rSprite", t_rSprite);
  setThePropOf(_this, "m_rAnimFrame", 1);
  setThePropOf(t_rSprite, "member", callNamed("member", "magic_flurry_1"));
  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
}

