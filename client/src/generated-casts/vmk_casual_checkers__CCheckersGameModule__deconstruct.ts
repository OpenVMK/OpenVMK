// vmk_casual_checkers.cct / CCheckersGameModule / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectExists", meProp(_me, "m_sInterface"))) {
  callNamed("removeObject", meProp(_me, "m_sInterface"))
  }

  var t_sCounter = "CheckersNextGameCounter";
  if (callNamed("objectExists", t_sCounter)) {
  callNamed("removeObject", t_sCounter)
  }

  return callNamed("callAncestor", symbol("deconstruct"), _this);
}

