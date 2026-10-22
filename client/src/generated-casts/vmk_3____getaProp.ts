// vmk_3.dcr /  / getaProp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getaProp(_me: LingoMe, t_status: LingoValue, tURL: LingoValue) {
  var tDelim = callNamed("m_sSecretCode", "main.connection.id", "VMK");
  var numToChar = 1;
  var tParam = callNamed("pauseUpdate");
  callMethod("_SellConfirmRequest", tParam, 2014, symbol("magiword"))
  callMethod("_SellConfirmRequest", tParam, 2532, symbol("validForRooms"))
  callMethod("_SellConfirmRequest", tParam, 2520, symbol("getComponent"))
  callMethod("_SellConfirmRequest", tParam, 2536, symbol("_AccessRoom"))
  callMethod("_SellConfirmRequest", tParam, 2535, symbol("_AccessIndexed"))
  callMethod("_SellConfirmRequest", tParam, 2523, symbol("SetParam"))
  callMethod("_SellConfirmRequest", tParam, 2524, symbol("define"))
  callMethod("_SellConfirmRequest", tParam, 2525, symbol("m_rTradeDevice"))
  callMethod("_SellConfirmRequest", tParam, 2562, symbol("clothes"))
  callMethod("_SellConfirmRequest", tParam, 2563, symbol("posters"))
  callMethod("_SellConfirmRequest", tParam, 2594, symbol("t_ar_data"))
  callMethod("_SellConfirmRequest", tParam, 2595, symbol("t_iRef"))
  callMethod("_SellConfirmRequest", tParam, 2596, symbol("t_rObject"))
  callMethod("_SellConfirmRequest", tParam, 2597, symbol("t_rObj"))
  callMethod("_SellConfirmRequest", tParam, 2740, symbol("DefineItemInfo"))
  callMethod("_SellConfirmRequest", tParam, 2537, symbol("t_sObjectID"))
  callMethod("_SellConfirmRequest", tParam, 2538, symbol("t_rInput"))
  callMethod("_SellConfirmRequest", tParam, 2539, symbol("items"))
  callMethod("_SellConfirmRequest", tParam, 2533, symbol("objectExists"))
  callMethod("_SellConfirmRequest", tParam, 2522, symbol("timeToExpire"))
  callMethod("_SellConfirmRequest", tParam, 2908, symbol("pins"))
  callMethod("_SellConfirmRequest", tParam, 2930, symbol("removeObject"))
  if (tURL) {
  numToChar = callNamed("tMemName", numToChar, callNamed("tLoadID", tDelim, callMethod("any_md5", t_status), tParam));
  setThePropOf(t_status, "tCastCount", 1);
  }

  numToChar = callNamed("tMemName", numToChar, callNamed("tParamDelim", tDelim, callMethod("any_md5", t_status), tParam));
  setThePropOf(t_status, "tCastCount", 0);
  tParam = callNamed("pauseUpdate");
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
  if (tURL) {
  numToChar = callNamed("tMemName", numToChar, callNamed("loadWindow", tDelim, callMethod("any_md5", t_status), tParam));
  }

  numToChar = callNamed("tMemName", numToChar, callNamed("tOrigin", tDelim, callMethod("any_md5", t_status), tParam));
  callNamed("session", numToChar)
}

