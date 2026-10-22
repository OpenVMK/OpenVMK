// vmk_domestic.cct / CHeiheiRenderer / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, _this: LingoValue) {
  /* global */ var gDebugMode = globalVar("gDebugMode");
  var t_iDirection = _this.m_rDirection;
  if (lingoBinary("gt", t_iDirection, 4)) {
  t_iDirection = lingoBinary("sub", 4, lingoBinary("mod", t_iDirection, 4));
  setThePropOf(_this.m_rSprite, "flipH", 1);
  } else {
  setThePropOf(_this.m_rSprite, "flipH", 0);
  }

  if (lingoBinary("and", lingoBinary("eq", _this.m_rAction, "pck"), lingoBinary("or", lingoBinary("eq", t_iDirection, 0), lingoBinary("eq", t_iDirection, 4)))) {
  t_iDirection = 2;
  }

  var t_rRenderMember = callNamed("member", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", _this.m_rAction, "_"), _this.m_sType), "_"), t_iDirection), "_"), _this.m_rAnimFrame));
  setThePropOf(_this.m_rSprite, "member", t_rRenderMember);
  setThePropOf(_this.m_rSprite, "width", t_rRenderMember.width);
  setThePropOf(_this.m_rSprite, "height", t_rRenderMember.height);
}

