// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / RequestItemInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestItemInfo(_me: LingoMe, _this: LingoValue, t_ar_Item: LingoValue, t_iMyRef: LingoValue) {
  if (callNamed("listp", t_ar_Item)) {
  if (lingoBinary("neq", t_ar_Item[symbol("state")], symbol("invalid"))) {
  var t_iItemRef = callNamed("integer", t_ar_Item[symbol("ref")]);
  callNamed("put", lingoBinary("joinPad", "Request details", new LingoPropList([symbol("int"), t_iMyRef, symbol("int"), 2, symbol("int"), t_iItemRef])))
  callMethod("send", callNamed("getConnection", "VMK"), "RequestItemDetails", new LingoPropList([symbol("int"), t_iMyRef, symbol("int"), 2, symbol("int"), t_iItemRef]))
  }

  }

}

