// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemVMKS / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (meProp(_me, "m_bAnimation")) {
  callMethod("RemoveAnimation", callNamed("getObject", "AnimationManager"), meProp(_me, "m_sAnimName"))
  }

  return callNamed("callAncestor", symbol("deconstruct"), _me);
}

