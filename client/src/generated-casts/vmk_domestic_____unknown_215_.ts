// vmk_domestic.cct /  / <unknown:215>

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _215(_me: LingoMe, _this: LingoValue) {
  /* global */ var _unknown_216_ = globalVar("<unknown:216>");
  var _230 = _this.m_rDirection;
  if (lingoBinary("gt", _230, 4)) {
  _230 = lingoBinary("sub", 4, lingoBinary("mod", _230, 4));
  setThePropOf(_this.m_rSprite, "#225", 1);
  } else {
  setThePropOf(_this.m_rSprite, "#225", 0);
  }

  var _229 = callNamed("#226", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", _this.m_rAction, "_npc_"), _this.m_rID), "_"), _230), "_"), _this._219));
  setThePropOf(_this.m_rSprite, "#226", _229);
  setThePropOf(_this.m_rSprite, "#227", _229._227);
  setThePropOf(_this.m_rSprite, "#228", _229._228);
}

