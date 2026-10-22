// vmk_domestic.cct /  / t_iAct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_iAct(_me: LingoMe, getComponent: LingoValue, _224: LingoValue) {
  /* global */ var _unknown_216_ = globalVar("<unknown:216>");
  if (lingoBinary("and", callNamed("_RemoveIndexed", _224), _216)) {
  _224 = callNamed("m_rXMLDomestic", 100);
  callNamed("#217", 100, 1)
  setThePropOf(callNamed("m_rXMLDomestic", 100), "t_fZSteepness", callNamed("#218", 150, 150));
  }

  setThePropOf(getComponent, "text", _224);
  setThePropOf(getComponent, "m_iAction", "std");
  setThePropOf(getComponent, "t_iRef", 4);
  setThePropOf(getComponent, "#219", 0);
  setThePropOf(getComponent, "#220", 0);
  setThePropOf(getComponent, "#221", 3);
  setThePropOf(getComponent, "t_bMoveUpdate", 1);
  setThePropOf(getComponent, "#222", "heihei");
  if (_216) {
  callNamed("#223", getComponent, symbol("handle_petstatus"))
  }

}

