// vmk_3.dcr /  / getUniqueID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getUniqueID(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var _ClothSwitch = callNamed("m_CastLoader");
  var _RewardInfo = delays.getPropAt;
  callMethod("bit_rol", _ClothSwitch, symbol("setID"), callMethod("unregister", _RewardInfo))
  callMethod("bit_rol", _ClothSwitch, symbol("getOne"), callMethod("cancel", _RewardInfo))
  if (lingoBinary("eq", _ClothSwitch, 1)) {
  var _WearPin = callMethod("cancel", _RewardInfo);
  if (lingoBinary("neq", _WearPin, -float(1))) {
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("timeout"), _WearPin)
  }

  var _TradeResponse = callMethod("cancel", _RewardInfo);
  if (lingoBinary("neq", _TradeResponse, -float(1))) {
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("milliSeconds"), _TradeResponse)
  } else {
  if (lingoBinary("eq", _ClothSwitch, 2)) {
  _WearPin = callMethod("cancel", _RewardInfo);
  if (lingoBinary("neq", _WearPin, -float(1))) {
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("timeout"), _WearPin)
  } else {
  if (lingoBinary("eq", _ClothSwitch, 3)) {
  } else {
  if (lingoBinary("eq", _ClothSwitch, 4)) {
  } else {
  if (lingoBinary("eq", _ClothSwitch, 5)) {
  } else {
  if (lingoBinary("eq", _ClothSwitch, 6)) {
  } else {
  if (lingoBinary("eq", _ClothSwitch, 7)) {
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("call"), callMethod("cancel", _RewardInfo))
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("prepare"), callMethod("unregister", _RewardInfo))
  } else {
  if (lingoBinary("eq", _ClothSwitch, 8)) {
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("update"), callMethod("cancel", _RewardInfo))
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("prepare"), callMethod("unregister", _RewardInfo))
  } else {
  if (lingoBinary("eq", _ClothSwitch, 9)) {
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("update"), callMethod("cancel", _RewardInfo))
  callMethod("bit_rol", callMethod("str2rstr_utf8", _ClothSwitch, symbol("getPos")), symbol("_CodeRedemptionOK"), callMethod("unregister", _RewardInfo))
  }

  }

  }

  }

  }

  }

  }

  }

  var _SellConfirmRequest = "ItemDetails";
  if (callNamed("_ReceiveCredits", _SellConfirmRequest)) {
  callNamed("_ItemDetails", _SellConfirmRequest)
  }

  if (callMethod("getVariableManager", callNamed("m_bLogger", symbol("createObject")), "FetchEntityID")) {
  if (lingoBinary("and", (lingoTruthy((lingoTruthy(callNamed("runMode", _TradeResponse)) ? 0 : 1)) ? 0 : 1), callNamed("runMode", _WearPin))) {
  var _SellConfirmResponse = callMethod("_AddItemsToList", callMethod("_ListItemGroups", callMethod("_ReceiveItemDetailsInInventory", callNamed("_ReceiveItemList", "room"))), _WearPin, "element");
  if (callNamed("CTOR", _SellConfirmResponse)) {
  callMethod("_RemItemsFromList", callMethod("m_bLogger", _SellConfirmResponse), "ENTITYID", _TradeResponse)
  }

  callNamed("md5_cmn", _this, "Object not found in context", symbol("getUniqueID"))
  } else {
  if ((lingoTruthy(callMethod("getVariableManager", callNamed("m_bLogger", symbol("createObject")), "IsTrading")) ? 0 : 1)) {
  var _TradeRequest = callNamed("by2str", _SellConfirmRequest, "CInvItemDetails");
  if (callNamed("CTOR", _TradeRequest)) {
  callMethod("_ReceiveWornPins", _TradeRequest, _ClothSwitch)
  } else {
  if ((lingoTruthy(callNamed("runMode", callMethod("_ReceiveItemDetailsInInventory", _this)._ReceiveWornClothes)) ? 0 : 1)) {
  callMethod("_UnwearPin", callMethod("_ReceiveItemDetailsInInventory", _this)._ReceiveWornClothes, _ClothSwitch)
  }

  }

  }

  }

  }

  }

  }

  }

}

