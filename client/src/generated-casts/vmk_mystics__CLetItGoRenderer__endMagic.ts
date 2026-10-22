// vmk_mystics.cct / CLetItGoRenderer / endMagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function endMagic(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this.m_rShadowSpr, "member", callNamed("getMember", "room_avatar_shadow"));
  setThePropOf(_this.m_rShadowSpr, "width", _this.m_rShadowSpr.member.width);
  setThePropOf(_this.m_rShadowSpr, "height", _this.m_rShadowSpr.member.height);
  setThePropOf(_this.m_rShadowSpr, "ink", 39);
  setThePropOf(_this.m_rShadowSpr, "blend", 50);
}

