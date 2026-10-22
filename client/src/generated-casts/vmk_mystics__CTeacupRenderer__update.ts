// vmk_mystics.cct / CTeacupRenderer / update

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
  var t_iDirection = 3;
  var t_bFlip = 0;
  var t_rFrameStr = "";
  if ((lingoTruthy(callNamed("memberExists", t_rFrameStr)) ? 0 : 1)) {
  t_rFrameStr = "null";
  }

  setThePropOf(_this.m_rSprite, "member", callNamed("member", t_rFrameStr));
  setThePropOf(_this.m_rSprite, "width", lingoBinary("mul", _this.m_rSprite.member.width, lingoBinary("div", _this.m_iTileSize, 32)));
  setThePropOf(_this.m_rSprite, "height", lingoBinary("mul", _this.m_rSprite.member.height, lingoBinary("div", _this.m_iTileSize, 32)));
}

