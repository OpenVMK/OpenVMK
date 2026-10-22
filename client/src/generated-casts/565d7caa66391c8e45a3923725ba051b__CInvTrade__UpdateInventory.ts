// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / UpdateInventory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateInventory(_me: LingoMe, _this: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_mp_ItemsInTrade"))) {
  return meProp(_me, "m_mp_ItemsInTrade");
  }

}

