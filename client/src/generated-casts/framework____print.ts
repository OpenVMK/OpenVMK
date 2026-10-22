// framework.dcr /  / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var t_sDelim = listp.getLast;
  var _ReceiveItemList = callNamed("go", 1, symbol("cancel"), 2, symbol("tDelayID"), 3, symbol("tProp"), 4, symbol("register"));
  var _ReceiveItemDetailsInInventory = callNamed("go");
  var _ListItemGroups = callMethod("symbolp", t_sDelim);
  if (lingoBinary("eq", t_sDelim, 1)) {
  var _AddItemsToList = symbol("setID");
  } else {
  if (lingoBinary("eq", t_sDelim, 3)) {
  _AddItemsToList = symbol("unregister");
  } else {
  if (lingoBinary("eq", t_sDelim, 5)) {
  _AddItemsToList = symbol("getOne");
  }

  }

  }

  var _RemItemsFromList = callMethod("symbolp", listp.getLast);
  var _ReceiveCredits = callMethod("symbolp", t_sDelim);
  var fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveCredits)) {
  var tTemp = callMethod("symbolp", t_sDelim);
  var _ReceiveWornPins = callMethod("symbolp", t_sDelim);
  var _ReceiveWornClothes = callMethod("symbolp", t_sDelim);
  var _UnwearPin = callMethod("temp", t_sDelim);
  var _WearPin = callMethod("symbolp", t_sDelim);
  if (lingoBinary("eq", t_sDelim, 1)) {
  var _ClothSwitch = symbol("cancel");
  var _CodeRedemptionOK = callMethod("symbolp", t_sDelim);
  if (lingoBinary("eq", _CodeRedemptionOK, 0)) {
  var _RewardInfo = 0;
  }

  _RewardInfo = new LingoList([]);
  var update = 1;
  while (lingoBinary("lte", update, _CodeRedemptionOK)) {
  update = lingoBinary("add", update, 1);
  }

  } else {
  if (lingoBinary("eq", t_sDelim, 2)) {
  _ClothSwitch = symbol("tDelayID");
  _RewardInfo = 0;
  } else {
  if (lingoBinary("eq", t_sDelim, 3)) {
  _ClothSwitch = symbol("tProp");
  _RewardInfo = 0;
  } else {
  if (lingoBinary("eq", t_sDelim, 4)) {
  _ClothSwitch = symbol("register");
  _RewardInfo = callMethod("symbolp", t_sDelim);
  var _SellConfirmRequest = callMethod("symbolp", t_sDelim);
  var _SellConfirmResponse = callMethod("symbolp", t_sDelim);
  }

  }

  }

  }

  var _TradeRequest = callMethod("getPos", _ReceiveItemDetailsInInventory, callMethod("getPos", _ReceiveItemList, _ReceiveWornClothes));
  if (lingoBinary("eq", _ReceiveWornClothes, 4)) {
  }

  fileName = lingoBinary("add", fileName, 1);
  }

  if (_RemItemsFromList) {
  callMethod("milliSeconds", callMethod("timeout", callMethod("tID", _return), _ListItemGroups))
  }

  fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveItemDetailsInInventory.externalParamValue)) {
  var prepare = callMethod("rstr2b64", _ReceiveItemDetailsInInventory, fileName);
  var _ItemDetails = callMethod("preloadMode", _ReceiveItemDetailsInInventory, fileName);
  callMethod("call", callMethod("timeout", callMethod("tID", _return), _ListItemGroups), prepare, _ItemDetails)
  fileName = lingoBinary("add", fileName, 1);
  }

}

