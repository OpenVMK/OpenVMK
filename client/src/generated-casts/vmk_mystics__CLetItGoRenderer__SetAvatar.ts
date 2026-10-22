// vmk_mystics.cct / CLetItGoRenderer / SetAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAvatar(_me: LingoMe, _this: LingoValue, a_rAvatar: LingoValue) {
  setThePropOf(_this, "m_rShadowSpr", callMethod("GetVisual", a_rAvatar).m_rShadowSpr);
  setThePropOf(_this.m_rShadowSpr, "member", callNamed("member", "room_shadow_snowflake"));
  setThePropOf(_this.m_rShadowSpr, "ink", 8);
  setThePropOf(_this.m_rShadowSpr, "width", _this.m_rShadowSpr.member.width);
  setThePropOf(_this.m_rShadowSpr, "height", _this.m_rShadowSpr.member.height);
}

