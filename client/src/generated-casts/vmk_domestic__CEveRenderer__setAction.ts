// vmk_domestic.cct / CEveRenderer / setAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAction(_me: LingoMe, _this: LingoValue, a_sAction: LingoValue) {
  /* global */ var gDebugMode = globalVar("gDebugMode");
  if (lingoBinary("eq", _this.m_rAction, a_sAction)) {
  return;
  }

  setThePropOf(_this, "m_rAnimFrame", 0);
  setThePropOf(_this, "m_rAction", a_sAction);
  setThePropOf(_this, "m_bDirty", 1);
}

