// vmk_furniture_code.cct / CItemAniStructure / GetInteractive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetInteractive(_me: LingoMe) {
  var t_bInteractive = 1;
  if (callNamed("objectp", meProp(_me, "m_rStructure"))) {
  if (callMethod("Search", meProp(_me, "m_rStructure"), "type", "ANI", 1)) {
  t_bInteractive = callNamed("value", callMethod("GetNode", meProp(_me, "m_rStructure")).param["INTERACTIVE"]);
  }

  }

  return t_bInteractive;
}

