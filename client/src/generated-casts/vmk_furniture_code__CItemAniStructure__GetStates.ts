// vmk_furniture_code.cct / CItemAniStructure / GetStates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetStates(_me: LingoMe) {
  var t_ar_states = new LingoList([]);
  if (callNamed("objectp", meProp(_me, "m_rStructure"))) {
  var t_animation = new LingoList([]);
  if (callMethod("Search", meProp(_me, "m_rStructure"), "type", "ANI", 1)) {
  for (var tstate of callMethod("GetNode", meProp(_me, "m_rStructure")).child.toArray()) {
  switch (tstate._type) {
case "STATE":
  var tPos = callMethod("findPos", tstate.param, "NUM");
  var t_bContinue = 0;
  if (lingoBinary("neq", tPos, 0)) {
  var tParamValue = callNamed("value", tstate.param[tPos]);
  callMethod("append", t_ar_states, tParamValue)
  }

  break;
  }

  }

  }

  }

  return t_ar_states;
}

