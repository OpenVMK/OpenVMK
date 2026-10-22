// c7d81c175a2637e0193f0cf7bfd014ba.cct / CBlockAct2 / _Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Init(_me: LingoMe, _this: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  if (callMethod("IsReady", callMethod("GetVisual", t_rObj))) {
  for (var t_rBlk of callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this))).toArray()) {
  callMethod("SetParam", t_rBlk, "ACT", "2")
  }

  setMeProp(_me, "m_bReady", 1);
  }

}

