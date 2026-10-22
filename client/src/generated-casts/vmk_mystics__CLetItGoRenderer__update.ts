// vmk_mystics.cct / CLetItGoRenderer / update

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
  if (lingoBinary("eq", lingoBinary("mod", _this.m_rFrame, 4), 0)) {
  setThePropOf(_this, "m_rAnimFrame", lingoBinary("add", lingoBinary("mod", _this.m_rAnimFrame, 15), 1));
  var t_rFrameStr = _this.m_rAnimFrame;
  setThePropOf(_this.m_rSprite, "member", callNamed("member", lingoBinary("join", "magic_flurry_", t_rFrameStr)));
  setThePropOf(_this.m_rSprite, "width", lingoBinary("mul", _this.m_rSprite.member.width, lingoBinary("div", _this.m_iTileSize, 32)));
  setThePropOf(_this.m_rSprite, "height", lingoBinary("mul", _this.m_rSprite.member.height, lingoBinary("div", _this.m_iTileSize, 32)));
  }

  setThePropOf(_this.m_rShadowSpr, "blend", lingoBinary("add", 50, lingoBinary("mul", callNamed("sin", lingoBinary("mul", _this.m_rFrame, 0.05)), 50)));
}

