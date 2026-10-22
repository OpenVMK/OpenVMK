// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var tMsgs = callNamed("propList");
  callNamed("setaProp", tMsgs, 2002, symbol("handle_hello"))
  callNamed("setaProp", tMsgs, -float(1), symbol("handle_disconnect"))
  callNamed("setaProp", tMsgs, 42, symbol("handle_avatarsets"))
  callNamed("setaProp", tMsgs, 43, symbol("handle_avatar"))
  callNamed("setaProp", tMsgs, 44, symbol("handle_avatarstatus"))
  callNamed("setaProp", tMsgs, 45, symbol("handle_chat"))
  callNamed("setaProp", tMsgs, 46, symbol("handle_avatarchange"))
  callNamed("setaProp", tMsgs, 47, symbol("handle_ping"))
  callNamed("setaProp", tMsgs, 48, symbol("handle_alert"))
  callNamed("setaProp", tMsgs, 49, symbol("handle_movesprites"))
  callNamed("setaProp", tMsgs, 50, symbol("handle_accepteula"))
  callNamed("setaProp", tMsgs, 51, symbol("handle_itemlist"))
  callNamed("setaProp", tMsgs, 52, symbol("handle_roominfo"))
  callNamed("setaProp", tMsgs, 53, symbol("handle_roomitems"))
  callNamed("setaProp", tMsgs, 54, symbol("handle_removeitem"))
  callNamed("setaProp", tMsgs, 55, symbol("handle_moveitem"))
  callNamed("setaProp", tMsgs, 56, symbol("handle_itemstate"))
  callNamed("setaProp", tMsgs, 57, symbol("handle_rotateitem"))
  callNamed("setaProp", tMsgs, 58, symbol("handle_editmode"))
  callNamed("setaProp", tMsgs, 59, symbol("handle_falsechat"))
  callNamed("setaProp", tMsgs, 60, symbol("handle_sendregusername"))
  callNamed("setaProp", tMsgs, 61, symbol("handle_userdata"))
  callNamed("setaProp", tMsgs, 62, symbol("handle_generalalert"))
  callNamed("setaProp", tMsgs, 63, symbol("handle_pinupdate"))
  callNamed("setaProp", tMsgs, 64, symbol("handle_usermove"))
  callNamed("setaProp", tMsgs, 67, symbol("handle_move"))
  callNamed("setaProp", tMsgs, 68, symbol("handle_redirect"))
  callNamed("setaProp", tMsgs, 69, symbol("handle_updatesignature"))
  callNamed("setaProp", tMsgs, 70, symbol("handle_tradechat"))
  callNamed("setaProp", tMsgs, 71, symbol("handle_reloadfurnimaps"))
  var tCmds = callNamed("propList");
  callNamed("setaProp", tCmds, "SSO_TICKET", 1232)
  callNamed("setaProp", tCmds, "NewChat", 1233)
  callNamed("setaProp", tCmds, "PONG", 1234)
  callNamed("setaProp", tCmds, "RegUsername", 1235)
  if (lingoBinary("gt", 1, tBool)) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

