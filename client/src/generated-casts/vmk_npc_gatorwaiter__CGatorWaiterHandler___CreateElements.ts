// vmk_npc_gatorwaiter.cct / CGatorWaiterHandler / _CreateElements

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateElements(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iTypeCode = callMethod("GetIntFrom", t_rInput);
  var t_iCategory = callMethod("GetIntFrom", t_rInput);
  var t_iPlaceRef = callMethod("GetIntFrom", t_rInput);
  var t_iAllowMove = callMethod("GetIntFrom", t_rInput);
  var t_iPrm = callMethod("GetIntFrom", t_rInput);
  var t_ar_iParams = new LingoList([]);
  switch (t_iCategory) {
case 1:
case 5:
  var t_iDir = callMethod("GetIntFrom", t_rInput);
  t_iPrm = lingoBinary("sub", t_iPrm, 1);
  if (t_iPrm) {
  var t_iState = callMethod("GetIntFrom", t_rInput);
  t_iPrm = lingoBinary("sub", t_iPrm, 1);
  } else {
  t_iState = 0;
  }

  if (lingoBinary("eq", t_iTypeCode, 4009)) {
  return callMethod("ControlGator", _this._interface, t_iDir, t_iState);
  }

  if (lingoBinary("gt", t_iPrm, 0)) {
  var t_ar_Params = new LingoList([]);
  for (var j = 1; j <= t_iPrm; ++j) {
  callMethod("append", t_ar_Params, callMethod("GetIntFrom", t_rInput))
  }

  } else {
  t_ar_Params = undefined;
  }

  break;
case 3:
  t_iPrm = lingoBinary("sub", t_iPrm, 3);
  for (var j = 1; j <= t_iPrm; ++j) {
  callMethod("add", t_ar_iParams, callMethod("GetIntFrom", t_rInput))
  }

  break;
case 6:
case 7:
  t_iDir = callMethod("GetIntFrom", t_rInput);
  t_iPrm = lingoBinary("sub", t_iPrm, 1);
  if (t_iPrm) {
  t_iState = callMethod("GetIntFrom", t_rInput);
  } else {
  t_iState = 0;
  }

  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Unsupported item category:", t_iCategory), symbol("_CreateElements"))
  for (var j = 1; j <= t_iPrm; ++j) {
  callMethod("add", t_ar_iParams, callMethod("GetIntFrom", t_rInput))
  }

  break;
  break;
  }

  }

}

