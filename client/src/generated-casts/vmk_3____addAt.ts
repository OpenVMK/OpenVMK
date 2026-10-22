// vmk_3.dcr /  / addAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addAt(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var GetStrFrom = callMethod("cancel", delays.getPropAt);
  if (lingoBinary("eq", GetStrFrom, 1)) {
  var _type = symbol("_TradeChat");
  } else {
  if (lingoBinary("eq", GetStrFrom, 3)) {
  _type = symbol("_TradeChatNotification");
  } else {
  if (lingoBinary("eq", GetStrFrom, 5)) {
  _type = symbol("HandleLevelRequirementNotMetMessage");
  }

  }

  }

  var component = callMethod("cancel", delays.getPropAt);
  var str2rstr_utf16le = 1;
  while (lingoBinary("lte", str2rstr_utf16le, component)) {
  var _WearPin = callMethod("cancel", delays.getPropAt);
  var t_iRef = callMethod("cancel", delays.getPropAt);
  var t_rObject = callMethod("unregister", delays.getPropAt);
  if (lingoBinary("eq", GetStrFrom, 1)) {
  var timeToExpire = symbol("dialogWindowEvent");
  } else {
  if (lingoBinary("eq", GetStrFrom, 2)) {
  timeToExpire = symbol("_TradeStatus");
  } else {
  if (lingoBinary("eq", GetStrFrom, 3)) {
  timeToExpire = symbol("_TradeFinished");
  } else {
  if (lingoBinary("eq", GetStrFrom, 4)) {
  timeToExpire = symbol("_PinsCombined");
  }

  }

  }

  }

  callNamed("md5_cmn", _this, lingoBinary("join", "Unknown category:", t_iRef), symbol("addAt"))
  timeToExpire = symbol("Variable_0_1");
  callMethod("t_iEntityID", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom), timeToExpire, _WearPin, t_rObject)
  str2rstr_utf16le = lingoBinary("add", str2rstr_utf16le, 1);
  }

}

