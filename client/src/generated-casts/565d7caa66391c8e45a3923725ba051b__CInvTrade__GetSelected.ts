// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue, a_rGrid: LingoValue, a_mp_iRef_rItem: LingoValue, a_iOffset: LingoValue) {
  var t_iSelected = lingoBinary("add", callMethod("GetSelected", a_rGrid), a_iOffset);
  if (lingoBinary("and", lingoBinary("gt", t_iSelected, 0), lingoBinary("lte", t_iSelected, a_mp_iRef_rItem.count))) {
  return a_mp_iRef_rItem[t_iSelected];
  }

  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid")]);
}

