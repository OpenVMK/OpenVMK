// vmk_domestic.cct /  / spriteNum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function spriteNum(_me: LingoMe, getComponent: LingoValue, _231: LingoValue) {
  /* global */ var _unknown_216_ = globalVar("<unknown:216>");
  if (lingoBinary("eq", getComponent.m_iAction, _231)) {
  callNamed("getThread")
  }

  setThePropOf(getComponent, "#219", 0);
  setThePropOf(getComponent, "m_iAction", _231);
  setThePropOf(getComponent, "t_bMoveUpdate", 1);
}

