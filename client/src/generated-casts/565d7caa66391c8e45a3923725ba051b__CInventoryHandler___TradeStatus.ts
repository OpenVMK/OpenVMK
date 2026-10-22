// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _TradeStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeStatus(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rOwnSet = new LingoPropList([symbol("confirm"), callMethod("GetIntFrom", a_rMsg.connection)]);
  var t_iItemCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_iRef_rItem_Own = new LingoPropList([]);
  for (var i = 1; i <= t_iItemCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCat = callMethod("GetIntFrom", a_rMsg.connection);
  switch (t_iCat) {
case 1:
  var t_iCnt = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_iCnt, 0)) {
  var t_iParam = 0;
  } else {
  t_iParam = new LingoList([]);
  }

  for (var j = 1; j <= t_iCnt; ++j) {
  callMethod("append", t_iParam, callMethod("GetIntFrom", a_rMsg.connection))
  }

  callMethod("setaProp", t_mp_iRef_rItem_Own, t_iRef, new LingoPropList([symbol("ref"), t_iRef, symbol("code"), t_iTyp, symbol("cat"), t_iCat, symbol("param"), t_iParam]))
  break;
case 4:
  var t_iPinLevel = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("setaProp", t_mp_iRef_rItem_Own, t_iRef, new LingoPropList([symbol("ref"), t_iRef, symbol("code"), t_iTyp, symbol("cat"), t_iCat, symbol("param"), t_iPinLevel]))
  break;
  default:
  callMethod("setaProp", t_mp_iRef_rItem_Own, t_iRef, new LingoPropList([symbol("ref"), t_iRef, symbol("code"), t_iTyp, symbol("cat"), t_iCat]))
  }

  }

  callMethod("setaProp", t_rOwnSet, symbol("items"), t_mp_iRef_rItem_Own)
  var t_rHerSet = new LingoPropList([symbol("confirm"), callMethod("GetIntFrom", a_rMsg.connection)]);
  t_iItemCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_iRef_rItem_Her = new LingoPropList([]);
  for (var i = 1; i <= t_iItemCount; ++i) {
  t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  t_iCat = callMethod("GetIntFrom", a_rMsg.connection);
  switch (t_iCat) {
case 1:
  t_iCnt = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_iCnt, 0)) {
  t_iParam = 0;
  } else {
  t_iParam = new LingoList([]);
  }

  for (var j = 1; j <= t_iCnt; ++j) {
  callMethod("append", t_iParam, callMethod("GetIntFrom", a_rMsg.connection))
  }

  callMethod("setaProp", t_mp_iRef_rItem_Her, t_iRef, new LingoPropList([symbol("ref"), t_iRef, symbol("code"), t_iTyp, symbol("page"), t_iCat, symbol("param"), t_iParam]))
  break;
case 4:
  t_iPinLevel = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("setaProp", t_mp_iRef_rItem_Her, t_iRef, new LingoPropList([symbol("ref"), t_iRef, symbol("code"), t_iTyp, symbol("page"), t_iCat, symbol("param"), t_iPinLevel]))
  break;
  default:
  callMethod("setaProp", t_mp_iRef_rItem_Her, t_iRef, new LingoPropList([symbol("ref"), t_iRef, symbol("code"), t_iTyp, symbol("page"), t_iCat]))
  }

  }

  callMethod("setaProp", t_rHerSet, symbol("items"), t_mp_iRef_rItem_Her)
  callMethod("TradeStatus", _this.component, t_rOwnSet, t_rHerSet)
}

