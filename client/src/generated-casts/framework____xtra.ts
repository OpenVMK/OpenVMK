// framework.dcr /  / xtra

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function xtra(_me: LingoMe, objectp: LingoValue, netAbort: LingoValue) {
  var pURL = callNamed("new", "main.connection.id", "VMK");
  var pLoadTime = 1;
  var pGroupId = callNamed("hex_hmac_md5");
  callMethod("tObj", pGroupId, 2014, symbol("_WearPin"))
  callMethod("tObj", pGroupId, 2532, symbol("_RewardInfo"))
  callMethod("tObj", pGroupId, 2520, symbol("_TradeResponse"))
  callMethod("tObj", pGroupId, 2536, symbol("dialogWindowEvent"))
  callMethod("tObj", pGroupId, 2535, symbol("_TradeStatus"))
  callMethod("tObj", pGroupId, 2523, symbol("_TradeFinished"))
  callMethod("tObj", pGroupId, 2524, symbol("_PinsCombined"))
  callMethod("tObj", pGroupId, 2525, symbol("_TradeChat"))
  callMethod("tObj", pGroupId, 2562, symbol("component"))
  callMethod("tObj", pGroupId, 2563, symbol("_UpdateCreditBalance"))
  callMethod("tObj", pGroupId, 2594, symbol("EnableLevelReqMsg"))
  callMethod("tObj", pGroupId, 2595, symbol("GetLevelReqMsgEnabled"))
  callMethod("tObj", pGroupId, 2596, symbol("a_rMsg"))
  callMethod("tObj", pGroupId, 2597, symbol("connection"))
  callMethod("tObj", pGroupId, 2740, symbol("_TradeChatNotification"))
  callMethod("tObj", pGroupId, 2537, symbol("HandleLevelRequirementNotMetMessage"))
  callMethod("tObj", pGroupId, 2538, symbol("DisableLevelReqMsg"))
  callMethod("tObj", pGroupId, 2539, symbol("GetIntFrom"))
  callMethod("tObj", pGroupId, 2533, symbol("_SellConfirmRequest"))
  callMethod("tObj", pGroupId, 2522, symbol("_ClothSwitch"))
  callMethod("tObj", pGroupId, 2908, symbol("t_iCredits"))
  callMethod("tObj", pGroupId, 2930, symbol("_SellConfirmResponse"))
  if (netAbort) {
  pLoadTime = callNamed("tpreloadId", pLoadTime, callNamed("ptryCount", pURL, callMethod("bytesSoFar", objectp), pGroupId));
  setThePropOf(objectp, "pFile", 1);
  }

  pLoadTime = callNamed("tpreloadId", pLoadTime, callNamed("Activate", pURL, callMethod("bytesSoFar", objectp), pGroupId));
  setThePropOf(objectp, "pFile", 0);
  pGroupId = callNamed("hex_hmac_md5");
  callMethod("tObj", pGroupId, "SellItemRequest", 522)
  callMethod("tObj", pGroupId, "WearPin", 523)
  callMethod("tObj", pGroupId, "UnwearPin", 530)
  callMethod("tObj", pGroupId, "SellItemConfirm", 525)
  callMethod("tObj", pGroupId, "CombinePin", 524)
  callMethod("tObj", pGroupId, "SellClothing", 529)
  callMethod("tObj", pGroupId, "CodeRedemption", 13)
  callMethod("tObj", pGroupId, "RequestBalance", 14)
  callMethod("tObj", pGroupId, "GetItemList", 532)
  callMethod("tObj", pGroupId, "TrdConfLevel", 586)
  callMethod("tObj", pGroupId, "TrdAddRemItem", 587)
  callMethod("tObj", pGroupId, "TrdSendRequest", 588)
  callMethod("tObj", pGroupId, "TrdResponse", 589)
  callMethod("tObj", pGroupId, "RequestItemDetails", 535)
  if (netAbort) {
  pLoadTime = callNamed("tpreloadId", pLoadTime, callNamed("tFile", pURL, callMethod("bytesSoFar", objectp), pGroupId));
  }

  pLoadTime = callNamed("tpreloadId", pLoadTime, callNamed("pNetId", pURL, callMethod("bytesSoFar", objectp), pGroupId));
  callNamed("session", pLoadTime)
}

