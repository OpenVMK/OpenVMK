// vmk_furniture_code.cct / CRoomItemVMKS / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bVisible", 1);
  setMeProp(_me, "m_bAnimation", 0);
  setMeProp(_me, "m_sAnimName", callNamed("getUniqueID"));
  setMeProp(_me, "m_bReady", 0);
  return 1;
}

