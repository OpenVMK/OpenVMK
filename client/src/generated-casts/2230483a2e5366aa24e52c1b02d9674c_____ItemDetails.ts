// 2230483a2e5366aa24e52c1b02d9674c.cct /  / _ItemDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ItemDetails(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var t_ar_data = callNamed("propList");
  var t_rInput = a_rMsg.connection;
  t_ar_data[symbol("code")] = callMethod("GetIntFrom", t_rInput);
  t_ar_data[symbol("owner")] = callMethod("GetStrFrom", t_rInput);
  t_ar_data[symbol("type")] = callMethod("GetIntFrom", t_rInput);
  t_ar_data[symbol("xtra")] = callNamed("propList");
  if (lingoBinary("eq", t_ar_data, 1)) {
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("neq", t_iRef, -float(1))) {
  t_ar_data[symbol("xtra")][symbol("ref")] = t_iRef;
  }

  var t_iEntityID = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("neq", t_iEntityID, -float(1))) {
  t_ar_data[symbol("xtra")][symbol("entityID")] = t_iEntityID;
  }

  } else {
  if (lingoBinary("eq", t_ar_data, 2)) {
  t_iRef = callMethod("GetIntFrom", t_rInput);
  if (lingoBinary("neq", t_iRef, -float(1))) {
  t_ar_data[symbol("xtra")][symbol("ref")] = t_iRef;
  }

  } else {
  if (lingoBinary("eq", t_ar_data, 3)) {
  } else {
  if (lingoBinary("eq", t_ar_data, 4)) {
  } else {
  if (lingoBinary("eq", t_ar_data, 5)) {
  } else {
  if (lingoBinary("eq", t_ar_data, 6)) {
  } else {
  if (lingoBinary("eq", t_ar_data, 7)) {
  t_ar_data[symbol("xtra")][symbol("pinlevel")] = callMethod("GetIntFrom", t_rInput);
  t_ar_data[symbol("xtra")][symbol("magiword")] = callMethod("GetStrFrom", t_rInput);
  } else {
  if (lingoBinary("eq", t_ar_data, 8)) {
  t_ar_data[symbol("xtra")][symbol("timeToExpire")] = callMethod("GetIntFrom", t_rInput);
  t_ar_data[symbol("xtra")][symbol("magiword")] = callMethod("GetStrFrom", t_rInput);
  } else {
  if (lingoBinary("eq", t_ar_data, 9)) {
  t_ar_data[symbol("xtra")][symbol("timeToExpire")] = callMethod("GetIntFrom", t_rInput);
  t_ar_data[symbol("xtra")][symbol("validForRooms")] = callMethod("GetStrFrom", t_rInput);
  } else {
  var t_sObjectID = "ItemDetails";
  if (callNamed("objectExists", t_sObjectID)) {
  callNamed("removeObject", t_sObjectID)
  }

  if (callMethod("GET", callNamed("getObject", symbol("session")), "FetchEntityID")) {
  if (lingoBinary("and", (lingoTruthy((lingoTruthy(callNamed("voidp", t_iEntityID)) ? 0 : 1)) ? 0 : 1), callNamed("voidp", t_iRef))) {
  var t_rObj = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), t_iRef, "element");
  if (callNamed("objectp", t_rObj)) {
  callMethod("SetParam", callMethod("getObject", t_rObj), "ENTITYID", t_iEntityID)
  } else {
  callNamed("error", _this, "Object not found in context", symbol("_ItemDetails"))
  }

  }

  } else {
  if ((lingoTruthy(callMethod("GET", callNamed("getObject", symbol("session")), "IsTrading")) ? 0 : 1)) {
  var t_rObject = callNamed("createObject", t_sObjectID, "CInvItemDetails");
  if (callNamed("objectp", t_rObject)) {
  callMethod("define", t_rObject, t_ar_data)
  }

  } else {
  if ((lingoTruthy(callNamed("voidp", callMethod("getComponent", _this).m_rTradeDevice)) ? 0 : 1)) {
  callMethod("DefineItemInfo", callMethod("getComponent", _this).m_rTradeDevice, t_ar_data)
  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

  }

}

