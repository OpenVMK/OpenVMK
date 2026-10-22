// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryInterface / ShowSellConfirm

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowSellConfirm(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue, a_iType: LingoValue, a_iPrice: LingoValue) {
  if (callNamed("objectExists", "InvSellConfirm")) {
  callMethod("setup", callNamed("getObject", "InvSellConfirm"), a_iRef, a_iType, a_iPrice)
  } else {
  callMethod("setup", callNamed("createObject", "InvSellConfirm", "CInvSellConfirm"), a_iRef, a_iType, a_iPrice)
  }

}

