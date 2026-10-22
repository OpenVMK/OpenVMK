// vmk_3.dcr /  / ClearItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearItems(_me: LingoMe, m_sSecretCode2: LingoValue, numToChar: LingoValue) {
  var tLoadID = callNamed("getPropRef", "main.connection.id", "VMK");
  var out = 1;
  var tParam = callNamed("externalParamValue");
  callMethod("_SellConfirmRequest", tParam, 2014, symbol("validForRooms"))
  callMethod("_SellConfirmRequest", tParam, 2532, symbol("removeObject"))
  callMethod("_SellConfirmRequest", tParam, 2520, symbol("_AccessIndexed"))
  callMethod("_SellConfirmRequest", tParam, 2536, symbol("SetParam"))
  callMethod("_SellConfirmRequest", tParam, 2535, symbol("define"))
  callMethod("_SellConfirmRequest", tParam, 2523, symbol("m_rTradeDevice"))
  callMethod("_SellConfirmRequest", tParam, 2524, symbol("DefineItemInfo"))
  callMethod("_SellConfirmRequest", tParam, 2525, symbol("t_sObjectID"))
  callMethod("_SellConfirmRequest", tParam, 2562, symbol("pins"))
  callMethod("_SellConfirmRequest", tParam, 2563, symbol("itemInventory"))
  callMethod("_SellConfirmRequest", tParam, 2594, symbol("t_iEntityID"))
  callMethod("_SellConfirmRequest", tParam, 2595, symbol("t_rObject"))
  callMethod("_SellConfirmRequest", tParam, 2596, symbol("items"))
  callMethod("_SellConfirmRequest", tParam, 2597, symbol("clothes"))
  callMethod("_SellConfirmRequest", tParam, 2740, symbol("t_rInput"))
  callMethod("_SellConfirmRequest", tParam, 2537, symbol("t_ar_data"))
  callMethod("_SellConfirmRequest", tParam, 2538, symbol("t_iRef"))
  callMethod("_SellConfirmRequest", tParam, 2539, symbol("posters"))
  callMethod("_SellConfirmRequest", tParam, 2533, symbol("getThread"))
  callMethod("_SellConfirmRequest", tParam, 2522, symbol("objectExists"))
  callMethod("_SellConfirmRequest", tParam, 2908, symbol("wornPins"))
  callMethod("_SellConfirmRequest", tParam, 2930, symbol("getComponent"))
  if (numToChar) {
  out = callNamed("loadWindow", out, callNamed("tMemName", tLoadID, callMethod("t_status", m_sSecretCode2), tParam));
  setThePropOf(m_sSecretCode2, "tDelim", 1);
  }

  out = callNamed("loadWindow", out, callNamed("tCastCount", tLoadID, callMethod("t_status", m_sSecretCode2), tParam));
  setThePropOf(m_sSecretCode2, "tDelim", 0);
  tParam = callNamed("externalParamValue");
  callMethod("_SellConfirmRequest", tParam, "SellItemRequest", 522)
  callMethod("_SellConfirmRequest", tParam, "WearPin", 523)
  callMethod("_SellConfirmRequest", tParam, "UnwearPin", 530)
  callMethod("_SellConfirmRequest", tParam, "SellItemConfirm", 525)
  callMethod("_SellConfirmRequest", tParam, "CombinePin", 524)
  callMethod("_SellConfirmRequest", tParam, "SellClothing", 529)
  callMethod("_SellConfirmRequest", tParam, "CodeRedemption", 13)
  callMethod("_SellConfirmRequest", tParam, "RequestBalance", 14)
  callMethod("_SellConfirmRequest", tParam, "GetItemList", 532)
  callMethod("_SellConfirmRequest", tParam, "TrdConfLevel", 586)
  callMethod("_SellConfirmRequest", tParam, "TrdAddRemItem", 587)
  callMethod("_SellConfirmRequest", tParam, "TrdSendRequest", 588)
  callMethod("_SellConfirmRequest", tParam, "TrdResponse", 589)
  callMethod("_SellConfirmRequest", tParam, "RequestItemDetails", 535)
  if (numToChar) {
  out = callNamed("loadWindow", out, callNamed("tOrigin", tLoadID, callMethod("t_status", m_sSecretCode2), tParam));
  }

  out = callNamed("loadWindow", out, callNamed("tURL", tLoadID, callMethod("t_status", m_sSecretCode2), tParam));
  callNamed("sprite", out)
}

