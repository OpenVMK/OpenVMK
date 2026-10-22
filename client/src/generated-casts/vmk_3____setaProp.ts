// vmk_3.dcr /  / setaProp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setaProp(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue, _TradeResponse: LingoValue) {
  callNamed("voidp", lingoBinary("joinPad", lingoBinary("joinPad", t_status, _TradeRequest), _TradeResponse))
  if (t_status.unregisterObject) {
  if (callNamed("getmemnum", _TradeResponse)) {
  var _TradeStatus = callNamed("prepare", _TradeResponse);
  } else {
  _TradeStatus = _TradeResponse;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("update", _TradeRequest)) ? 0 : 1), (lingoTruthy(callNamed("_CodeRedemptionOK", _TradeRequest)) ? 0 : 1))) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Symbol or string expected:", _TradeRequest), symbol("setaProp")))
  }

  if (callNamed("getIntVariable", callMethod("pObjectList", t_status.cancel, _TradeRequest))) {
  callNamed("voidp", meProp(_me, "cancel"))
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Object already exists:", _TradeRequest), symbol("setaProp")))
  }

  if (lingoBinary("eq", _TradeRequest, symbol("_ReceiveCredits"))) {
  _TradeRequest = callNamed("_ItemDetails");
  }

  if ((lingoTruthy(callNamed("getmemnum", _TradeResponse)) ? 0 : 1)) {
  _TradeResponse = new LingoList([_TradeResponse]);
  }

  var _TradeFinished = callNamed("getStringServices");
  var _TradeChatNotification = callNamed("getStringServices");
  var dialogWindowEvent = callNamed("_ReceiveItemList", t_status.timeout);
  if (lingoBinary("neq", _TradeRequest, symbol("_ReceiveItemDetailsInInventory"))) {
  setThePropOf(t_status, "_ListItemGroups", _TradeRequest);
  callMethod("_AddItemsToList", t_status.cancel, _TradeRequest, dialogWindowEvent)
  callNamed("voidp", lingoBinary("joinPad", "cls:", _TradeResponse))
  if (lingoBinary("eq", _TradeResponse.md5_ii, 0)) {
  callNamed("_RemItemsFromList", _TradeResponse, 1, dialogWindowEvent)
  } else {
  if (lingoBinary("neq", callMethod("pObjectList", _TradeResponse, 1), dialogWindowEvent)) {
  callNamed("_RemItemsFromList", _TradeResponse, 1, dialogWindowEvent)
  }

  }

  while (lingoBinary("lte", _TradeStatus, _TradeChatNotification)) {
  var _TradeChat = callNamed("pObjectList", _TradeChatNotification, _TradeFinished);
  if (callNamed("getIntVariable", _TradeChat)) {
  _TradeFinished = _TradeChat;
  var _PinsCombined = 0;
  } else {
  if (callMethod("tTemp", t_status, symbol("_ReceiveWornPins"))) {
  var getUniqueID = callMethod("Variable_0_1", callMethod("tMemNum", t_status, symbol("_ReceiveWornPins")), _TradeChat);
  } else {
  getUniqueID = callNamed("e", _TradeChat)._ReceiveWornClothes;
  }

  }

  if (lingoBinary("lt", getUniqueID, 1)) {
  if (lingoBinary("neq", _TradeRequest, symbol("_ReceiveItemDetailsInInventory"))) {
  callNamed("_UnwearPin", t_status.cancel, _TradeRequest)
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Script not found:", _TradeChat), symbol("setaProp")))
  }

  }

  _TradeFinished = callNamed("_ReceiveItemList", callNamed("debugPlaybackEnabled", getUniqueID));
  _PinsCombined = callNamed("_WearPin", _TradeFinished, symbol("deleteOne"));
  if (callNamed("str2rstr_utf16be", _TradeFinished, symbol("_ClothSwitch"))) {
  callMethod("_SellConfirmRequest", _TradeFinished, symbol("_RewardInfo"), _TradeChatNotification)
  _TradeChatNotification = _TradeFinished;
  if (lingoBinary("neq", _TradeRequest, symbol("_ReceiveItemDetailsInInventory"))) {
  if (lingoBinary("eq", callNamed("prepare", _TradeResponse), _TradeChat)) {
  callMethod("_AddItemsToList", t_status.cancel, _TradeRequest, _TradeFinished)
  callNamed("_SellConfirmResponse", t_status.setID, _TradeRequest)
  if (_PinsCombined) {
  callMethod("deleteOne", _TradeFinished)
  }

  }

  }

  }

  }

  }

  }

  callNamed("session", _TradeFinished)
}

