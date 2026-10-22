// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogHandler / regMsgList

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
  callMethod("setaProp", tMsgs, 2014, symbol("_ReceiveBalance"))
  callMethod("setaProp", tMsgs, 2701, symbol("CatalogIndex"))
  callMethod("setaProp", tMsgs, 2016, symbol("GetCatalogCategory"))
  callMethod("setaProp", tMsgs, 2017, symbol("PurchaseOk"))
  callMethod("setaProp", tMsgs, 2700, symbol("RoomPurchaseOk"))
  callMethod("setaProp", tMsgs, 4015, symbol("HandleCatalogError"))
  callMethod("setaProp", tMsgs, 4016, symbol("HandleCatalogError"))
  callMethod("setaProp", tMsgs, 4017, symbol("HandleCatalogError"))
  callMethod("setaProp", tMsgs, 4018, symbol("HandleCatalogError"))
  callMethod("setaProp", tMsgs, 4700, symbol("HandleCatalogError"))
  callMethod("setaProp", tMsgs, 4701, symbol("HandleCatalogError"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "RequestBalance", 14)
  callMethod("setaProp", tCmds, "CAT_INDEX_REQUEST", 15)
  callMethod("setaProp", tCmds, "CAT_CATEGORY_REQUEST", 16)
  callMethod("setaProp", tCmds, "BUY", 17)
  callMethod("setaProp", tCmds, "BUY_ROOM", 700)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

