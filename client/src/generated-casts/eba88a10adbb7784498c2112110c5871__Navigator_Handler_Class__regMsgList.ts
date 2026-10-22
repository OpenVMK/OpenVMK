// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2020, symbol("navigationNodeInfo"))
  callMethod("setaProp", tMsgs, 2021, symbol("parentChain"))
  callMethod("setaProp", tMsgs, 2022, symbol("userSelectableNodes"))
  callMethod("setaProp", tMsgs, 2023, symbol("InstanceInfo"))
  callMethod("setaProp", tMsgs, 2030, symbol("spaceListSearch"))
  callMethod("setaProp", tMsgs, 2031, symbol("spaceListPopular"))
  callMethod("setaProp", tMsgs, 2032, symbol("spaceListSearch"))
  callMethod("setaProp", tMsgs, 2033, symbol("spaceListSearch"))
  callMethod("setaProp", tMsgs, 2046, symbol("PrivateRoomIsClosing"))
  callMethod("setaProp", tMsgs, 2047, symbol("PrivateRoomIsClosing"))
  callMethod("setaProp", tMsgs, 2790, symbol("UserWasKicked"))
  callMethod("setaProp", tMsgs, 2040, symbol("_EntranceDenied"))
  callMethod("setaProp", tMsgs, 2041, symbol("_QueueRoom"))
  callMethod("setaProp", tMsgs, 2042, symbol("_CancelRoomLoad"))
  callMethod("setaProp", tMsgs, 2794, symbol("RoomSellConfRequest"))
  callMethod("setaProp", tMsgs, 2795, symbol("RoomSold"))
  callMethod("setaProp", tMsgs, 2830, symbol("spaceListRoomType"))
  callMethod("setaProp", tMsgs, 2831, symbol("SpaceListRoomTypeTrigger"))
  callMethod("setaProp", tMsgs, 2832, symbol("CreateFastPass"))
  callMethod("setaProp", tMsgs, 2833, symbol("CancelFastPass"))
  callMethod("setaProp", tMsgs, 2834, symbol("FastPAssQueuePosition"))
  callMethod("setaProp", tMsgs, 20, symbol("HandleError"))
  callMethod("setaProp", tMsgs, 21, symbol("HandleError"))
  callMethod("setaProp", tMsgs, 22, symbol("HandleError"))
  callMethod("setaProp", tMsgs, 23, symbol("HandleError"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "NavigatorHandshake", 20)
  callMethod("setaProp", tCmds, "GET_PARENT_CHAIN", 21)
  callMethod("setaProp", tCmds, "NAVIGATE_NODE", 22)
  callMethod("setaProp", tCmds, "GET_USER_SELECTABLE_NODES", 23)
  callMethod("setaProp", tCmds, "GET_OWN_SPACES", 24)
  callMethod("setaProp", tCmds, "GET_ROOT_NODE", 25)
  callMethod("setaProp", tCmds, "NODE_INSTANCES", 26)
  callMethod("setaProp", tCmds, "FRIEND_SPACES", 27)
  callMethod("setaProp", tCmds, "SEARCH_PRIVATE", 28)
  callMethod("setaProp", tCmds, "GET_POPULAR", 29)
  callMethod("setaProp", tCmds, "PRIVATE_SPACE_REQUEST", 30)
  callMethod("setaProp", tCmds, "PUBLIC_SPACE_REQUEST", 31)
  callMethod("setaProp", tCmds, "searchAnyRoom", 38)
  callMethod("setaProp", tCmds, "CancelRoomQueue", 41)
  callMethod("setaProp", tCmds, "SellRoom", 597)
  callMethod("setaProp", tCmds, "Ping", 12)
  callMethod("setaProp", tCmds, "GetPopularSpacesByType", 830)
  callMethod("setaProp", tCmds, "GetFastPass", 832)
  callMethod("setaProp", tCmds, "DiscardFastPass", 833)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

  return 1;
}

