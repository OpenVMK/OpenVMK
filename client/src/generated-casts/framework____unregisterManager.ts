// framework.dcr /  / unregisterManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterManager(_me: LingoMe, _return: LingoValue, listp: LingoValue) {
  var _ListItemGroups = callMethod("symbolp", listp.getLast);
  if (lingoBinary("eq", _ListItemGroups, 1)) {
  var _AddItemsToList = symbol("setID");
  } else {
  if (lingoBinary("eq", _ListItemGroups, 3)) {
  _AddItemsToList = symbol("unregister");
  } else {
  if (lingoBinary("eq", _ListItemGroups, 5)) {
  _AddItemsToList = symbol("getOne");
  }

  }

  }

  var _ReceiveCredits = callMethod("symbolp", listp.getLast);
  var fileName = 1;
  while (lingoBinary("lte", fileName, _ReceiveCredits)) {
  var tTemp = callMethod("symbolp", listp.getLast);
  var GetLevelReqMsgEnabled = callMethod("symbolp", listp.getLast);
  var a_rMsg = callMethod("temp", listp.getLast);
  if (lingoBinary("eq", _ListItemGroups, 1)) {
  var _ClothSwitch = symbol("cancel");
  } else {
  if (lingoBinary("eq", _ListItemGroups, 2)) {
  _ClothSwitch = symbol("tDelayID");
  } else {
  if (lingoBinary("eq", _ListItemGroups, 3)) {
  _ClothSwitch = symbol("tProp");
  } else {
  if (lingoBinary("eq", _ListItemGroups, 4)) {
  _ClothSwitch = symbol("register");
  }

  }

  }

  }

  callNamed("t_iCoreCastNum", _return, lingoBinary("join", "Unknown category:", GetLevelReqMsgEnabled), symbol("unregisterManager"))
  _ClothSwitch = symbol("frame");
  callMethod("_Configure", callMethod("timeout", callMethod("tID", _return), _ListItemGroups), _ClothSwitch, tTemp, a_rMsg)
  fileName = lingoBinary("add", fileName, 1);
  }

}

