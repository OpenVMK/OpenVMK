// vmk_3.dcr /  / rawNew

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawNew(_me: LingoMe, _this: LingoValue, delays: LingoValue) {
  var _RewardInfo = delays.getPropAt;
  var t_iCredits = callNamed("m_CastLoader", 1, symbol("dialogWindowEvent"), 2, symbol("_TradeStatus"), 3, symbol("_TradeFinished"), 4, symbol("_PinsCombined"));
  var owner = callNamed("m_CastLoader");
  var GetStrFrom = callMethod("cancel", _RewardInfo);
  if (lingoBinary("eq", _RewardInfo, 1)) {
  var _type = symbol("_TradeChat");
  } else {
  if (lingoBinary("eq", _RewardInfo, 3)) {
  _type = symbol("_TradeChatNotification");
  } else {
  if (lingoBinary("eq", _RewardInfo, 5)) {
  _type = symbol("HandleLevelRequirementNotMetMessage");
  }

  }

  }

  var xtra = callMethod("cancel", delays.getPropAt);
  var component = callMethod("cancel", _RewardInfo);
  var str2rstr_utf16le = 1;
  while (lingoBinary("lte", str2rstr_utf16le, component)) {
  var _WearPin = callMethod("cancel", _RewardInfo);
  var ref = callMethod("cancel", _RewardInfo);
  var entityID = callMethod("cancel", _RewardInfo);
  var pinlevel = callMethod("unregister", _RewardInfo);
  var magiword = callMethod("cancel", _RewardInfo);
  if (lingoBinary("eq", _RewardInfo, 1)) {
  var timeToExpire = symbol("dialogWindowEvent");
  var GetIntFrom = callMethod("cancel", _RewardInfo);
  if (lingoBinary("eq", GetIntFrom, 0)) {
  var validForRooms = 0;
  }

  validForRooms = new LingoList([]);
  var connection = 1;
  while (lingoBinary("lte", connection, GetIntFrom)) {
  connection = lingoBinary("add", connection, 1);
  }

  } else {
  if (lingoBinary("eq", _RewardInfo, 2)) {
  timeToExpire = symbol("_TradeStatus");
  validForRooms = 0;
  } else {
  if (lingoBinary("eq", _RewardInfo, 3)) {
  timeToExpire = symbol("_TradeFinished");
  validForRooms = 0;
  } else {
  if (lingoBinary("eq", _RewardInfo, 4)) {
  timeToExpire = symbol("_PinsCombined");
  validForRooms = callMethod("cancel", _RewardInfo);
  var objectExists = callMethod("cancel", _RewardInfo);
  var removeObject = callMethod("cancel", _RewardInfo);
  }

  }

  }

  }

  var getThread = callMethod("DisableLevelReqMsg", owner, callMethod("DisableLevelReqMsg", t_iCredits, entityID));
  if (lingoBinary("eq", entityID, 4)) {
  }

  str2rstr_utf16le = lingoBinary("add", str2rstr_utf16le, 1);
  }

  if (xtra) {
  callMethod("GetLevelReqMsgEnabled", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom))
  }

  str2rstr_utf16le = 1;
  while (lingoBinary("lte", str2rstr_utf16le, owner.voidp)) {
  var a_rMsg = callMethod("pManagerList", owner, str2rstr_utf16le);
  var _UpdateCreditBalance = callMethod("str2rstr_utf8", owner, str2rstr_utf16le);
  callMethod("_Configure", callMethod("EnableLevelReqMsg", callMethod("_ReceiveItemDetailsInInventory", _this), GetStrFrom), a_rMsg, _UpdateCreditBalance)
  str2rstr_utf16le = lingoBinary("add", str2rstr_utf16le, 1);
  }

}

