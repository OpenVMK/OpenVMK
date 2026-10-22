// vmk_3.dcr /  / _TradeStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeStatus(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rOwnSet = callNamed("propList", symbol("confirm"), callMethod("GetIntFrom", a_rMsg.connection));
  var t_iItemCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_iRef_rItem_Own = callNamed("propList");
  var i = 1;
  while (lingoBinary("lte", i, t_iItemCount)) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCat = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_rOwnSet, 1)) {
  var t_iCnt = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_iCnt, 0)) {
  var t_iParam = 0;
  }

  t_iParam = new LingoList([]);
  var j = 1;
  while (lingoBinary("lte", j, t_iCnt)) {
  j = lingoBinary("add", j, 1);
  }

  } else {
  if (lingoBinary("eq", t_rOwnSet, 4)) {
  var t_iPinLevel = callMethod("GetIntFrom", a_rMsg.connection);
  }

  }

  i = lingoBinary("add", i, 1);
  }

  var t_rHerSet = callNamed("propList", symbol("confirm"), callMethod("GetIntFrom", a_rMsg.connection));
  t_iItemCount = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_iRef_rItem_Her = callNamed("propList");
  i = 1;
  while (lingoBinary("lte", i, t_iItemCount)) {
  t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  t_iCat = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_rOwnSet, 1)) {
  t_iCnt = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_iCnt, 0)) {
  t_iParam = 0;
  }

  t_iParam = new LingoList([]);
  j = 1;
  while (lingoBinary("lte", j, t_iCnt)) {
  j = lingoBinary("add", j, 1);
  }

  } else {
  if (lingoBinary("eq", t_rOwnSet, 4)) {
  t_iPinLevel = callMethod("GetIntFrom", a_rMsg.connection);
  }

  }

  i = lingoBinary("add", i, 1);
  }

}

