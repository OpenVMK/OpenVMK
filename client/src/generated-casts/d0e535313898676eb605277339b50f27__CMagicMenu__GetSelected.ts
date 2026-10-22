// d0e535313898676eb605277339b50f27.cct / CMagicMenu / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  var t_iSelected = callMethod("GetSelected", meProp(_me, "m_rGrid"));
  if (lingoBinary("and", lingoBinary("gt", t_iSelected, 0), lingoBinary("lte", t_iSelected, meProp(_me, "m_mp_FxList").count))) {
  return meProp(_me, "m_mp_FxList")[t_iSelected];
  } else {
  return new LingoPropList([symbol("FxId"), -float(1), symbol("code"), -float(1), symbol("ItemId"), -float(1), symbol("name"), "", symbol("trigger"), "", symbol("available"), 0, symbol("level"), 0, symbol("Active"), 0, symbol("singleuse"), 0, symbol("expirydate"), -float(1)]);
  }

}

