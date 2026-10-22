// vmk_mystics.cct /  / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "m_rFrame", lingoBinary("add", _this.m_rFrame, 1));
  var t_rFrameStr = "shot_000";
  if (lingoBinary("lt", meProp(_me, "m_rAnimFrame"), 10)) {
  t_rFrameStr = lingoBinary("join", t_rFrameStr, "0");
  }

  if (lingoBinary("lt", meProp(_me, "m_rAnimFrame"), 100)) {
  t_rFrameStr = lingoBinary("join", t_rFrameStr, "0");
  }

  t_rFrameStr = lingoBinary("join", t_rFrameStr, meProp(_me, "m_rAnimFrame"));
  if (lingoBinary("lt", meProp(_me, "m_rAnimFrame"), 3)) {
  t_rFrameStr = "shot_000002";
  }

  setThePropOf(_this.m_rSprite, "member", callNamed("member", t_rFrameStr));
  setThePropOf(_this.m_rSprite, "width", lingoBinary("mul", _this.m_rSprite.member.width, lingoBinary("div", _this.m_iTileSize, 32)));
  setThePropOf(_this.m_rSprite, "height", lingoBinary("mul", _this.m_rSprite.member.height, lingoBinary("div", _this.m_iTileSize, 32)));
  setThePropOf(_this, "m_rAnimFrame", lingoBinary("mod", lingoBinary("add", _this.m_rAnimFrame, 1), 136));
}

