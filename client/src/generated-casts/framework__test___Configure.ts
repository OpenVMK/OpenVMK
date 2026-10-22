// framework.dcr / test / _Configure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Configure(_me: LingoMe, _this: LingoValue, a_bBool: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_bReturn = 1;
  var t_rList = callNamed("propList");
  callMethod("setaProp", t_rList, 2014, symbol("_ReceiveCredits"))
  callMethod("setaProp", t_rList, 2532, symbol("_ReceiveItemList"))
  callMethod("setaProp", t_rList, 2520, symbol("_RemItemsFromList"))
  callMethod("setaProp", t_rList, 2536, symbol("_ReceiveWornPins"))
  callMethod("setaProp", t_rList, 2535, symbol("_ReceiveWornClothes"))
  callMethod("setaProp", t_rList, 2523, symbol("_UnwearPin"))
  callMethod("setaProp", t_rList, 2524, symbol("_WearPin"))
  callMethod("setaProp", t_rList, 2525, symbol("_ClothSwitch"))
  callMethod("setaProp", t_rList, 2562, symbol("_TradeChat"))
  callMethod("setaProp", t_rList, 2563, symbol("_TradeChatNotification"))
  callMethod("setaProp", t_rList, 2594, symbol("_TradeRequest"))
  callMethod("setaProp", t_rList, 2595, symbol("_TradeResponse"))
  callMethod("setaProp", t_rList, 2596, symbol("_TradeStatus"))
  callMethod("setaProp", t_rList, 2597, symbol("_TradeFinished"))
  callMethod("setaProp", t_rList, 2740, symbol("_RewardInfo"))
  callMethod("setaProp", t_rList, 2537, symbol("_SellConfirmRequest"))
  callMethod("setaProp", t_rList, 2538, symbol("_SellConfirmResponse"))
  callMethod("setaProp", t_rList, 2539, symbol("_PinsCombined"))
  callMethod("setaProp", t_rList, 2533, symbol("_ReceiveItemDetailsInInventory"))
  callMethod("setaProp", t_rList, 2522, symbol("_ItemDetails"))
  callMethod("setaProp", t_rList, 2908, symbol("HandleLevelRequirementNotMetMessage"))
  callMethod("setaProp", t_rList, 2930, symbol("_ListItemGroups"))
  if (a_bBool) {
  t_bReturn = callNamed("bitAnd", t_bReturn, callNamed("registerListener", t_sID, callMethod("getID", _this), t_rList));
  setThePropOf(_this, "m_bLevelReqMsgEnabled", 1);
  }

  t_bReturn = callNamed("bitAnd", t_bReturn, callNamed("unregisterListener", t_sID, callMethod("getID", _this), t_rList));
  setThePropOf(_this, "m_bLevelReqMsgEnabled", 0);
  t_rList = callNamed("propList");
  callMethod("setaProp", t_rList, "SellItemRequest", 522)
  callMethod("setaProp", t_rList, "WearPin", 523)
  callMethod("setaProp", t_rList, "UnwearPin", 530)
  callMethod("setaProp", t_rList, "SellItemConfirm", 525)
  callMethod("setaProp", t_rList, "CombinePin", 524)
  callMethod("setaProp", t_rList, "SellClothing", 529)
  callMethod("setaProp", t_rList, "CodeRedemption", 13)
  callMethod("setaProp", t_rList, "RequestBalance", 14)
  callMethod("setaProp", t_rList, "GetItemList", 532)
  callMethod("setaProp", t_rList, "TrdConfLevel", 586)
  callMethod("setaProp", t_rList, "TrdAddRemItem", 587)
  callMethod("setaProp", t_rList, "TrdSendRequest", 588)
  callMethod("setaProp", t_rList, "TrdResponse", 589)
  callMethod("setaProp", t_rList, "RequestItemDetails", 535)
  if (a_bBool) {
  t_bReturn = callNamed("bitAnd", t_bReturn, callNamed("registerCommands", t_sID, callMethod("getID", _this), t_rList));
  }

  t_bReturn = callNamed("bitAnd", t_bReturn, callNamed("unregisterCommands", t_sID, callMethod("getID", _this), t_rList));
  return t_bReturn;
}

