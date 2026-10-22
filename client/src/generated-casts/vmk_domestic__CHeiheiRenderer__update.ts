// vmk_domestic.cct / CHeiheiRenderer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  /* global */ var gDebugMode = globalVar("gDebugMode");
  if (lingoBinary("eq", _this.m_rAction, "std")) {
  setThePropOf(_this, "m_rAnimFrame", 0);
  }

  if (lingoBinary("and", lingoBinary("eq", _this.m_rAction, "wlk"), lingoBinary("eq", lingoBinary("mod", _this.m_rCurrentFrame, _this.m_rWalkSpeed), 0))) {
  setThePropOf(_this, "m_rAnimFrame", lingoBinary("mod", lingoBinary("add", _this.m_rAnimFrame, 1), 4));
  setThePropOf(_this, "m_bDirty", 1);
  }

  if (lingoBinary("and", lingoBinary("eq", _this.m_rAction, "pck"), lingoBinary("eq", lingoBinary("mod", _this.m_rCurrentFrame, 2), 0))) {
  setThePropOf(_this, "m_rAnimFrame", lingoBinary("mod", lingoBinary("add", _this.m_rAnimFrame, 1), 10));
  setThePropOf(_this, "m_bDirty", 1);
  }

  setThePropOf(_this, "m_rCurrentFrame", lingoBinary("add", _this.m_rCurrentFrame, 1));
  if (_this.m_bDirty) {
  callMethod("render", _this)
  }

}

