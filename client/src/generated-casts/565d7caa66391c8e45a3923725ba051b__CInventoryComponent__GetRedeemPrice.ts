// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / GetRedeemPrice

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRedeemPrice(_me: LingoMe, _this: LingoValue, a_iItemCode: LingoValue) {
  return callMethod("getaProp", meProp(_me, "m_mp_iRedeemPrice"), a_iItemCode);
}

