// vmk_3.dcr /  / DefineItemInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineItemInfo(_me: LingoMe, t_status: LingoValue, GetInventory: LingoValue) {
  callNamed("t_mp_iRef_rItem_Her", callMethod("t_kCat", GetInventory))
}

