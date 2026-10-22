// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CItemAniStructure / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rStructure"))) {
  callMethod("close", meProp(_me, "m_rStructure"))
  }

  setMeProp(_me, "m_rStructure", undefined);
  return 1;
}

