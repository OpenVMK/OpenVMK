// c7d81c175a2637e0193f0cf7bfd014ba.cct / CItemAniStructure / getDelay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getDelay(_me: LingoMe) {
  var t_iDelay = 5;
  if (callNamed("objectp", meProp(_me, "m_rStructure"))) {
  if (callMethod("Search", meProp(_me, "m_rStructure"), "type", "ANI", 1)) {
  var t_iMaxDelay = callNamed("value", callMethod("GetNode", meProp(_me, "m_rStructure")).param["DELAY"]);
  t_iDelay = callNamed("max", 1, t_iMaxDelay);
  }

  }

  return t_iDelay;
}

