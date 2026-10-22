// vmk_furniture_code.cct / CRoomItemVMKS / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe) {
  if (callMethod("checkVMKSReady", _me)) {
  setMeProp(_me, "m_bReady", 1);
  callMethod("showVMKS", _me)
  }

}

