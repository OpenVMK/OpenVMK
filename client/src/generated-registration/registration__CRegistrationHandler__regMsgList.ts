// registration.cct / CRegistrationHandler / regMsgList

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, _this: LingoValue, tBool: LingoValue) {
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2010, symbol("SaveSessionId"))
  callMethod("setaProp", tMsgs, 2018, symbol("HandleLogin"))
  callMethod("setaProp", tMsgs, 2023, symbol("InstanceInfo"))
  callMethod("setaProp", tMsgs, 2034, symbol("NavigatorHandshaked"))
  callMethod("setaProp", tMsgs, 2502, symbol("getAvailableSets"))
  callMethod("setaProp", tMsgs, 2507, symbol("AvatarCreated"))
  callMethod("setaProp", tMsgs, 2508, symbol("AvatarNotCreated"))
  callMethod("setaProp", tMsgs, 2509, symbol("AvailableGuestRooms"))
  callMethod("setaProp", tMsgs, 2510, symbol("SetName"))
  callMethod("setaProp", tMsgs, 2511, symbol("NameRejected"))
  callMethod("setaProp", tMsgs, 2512, symbol("HairListForHats"))
  callMethod("setaProp", tMsgs, 2514, symbol("LandingRoom"))
  callMethod("setaProp", tMsgs, 2515, symbol("GeneratedNames"))
  callMethod("setaProp", tMsgs, 4501, symbol("HandleError"))
  callMethod("setaProp", tMsgs, 4502, symbol("HandleError"))
  callMethod("setaProp", tMsgs, 4503, symbol("HandleError"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "NavigatorHandshake", 20)
  callMethod("setaProp", tCmds, "InstanceInfoByTag", 36)
  callMethod("setaProp", tCmds, "LoginRequest", 720)
  callMethod("setaProp", tCmds, "GetNewAvatarSets", 502)
  callMethod("setaProp", tCmds, "CreateAvatar", 507)
  callMethod("setaProp", tCmds, "AcceptEULA", 508)
  callMethod("setaProp", tCmds, "GetName", 510)
  callMethod("setaProp", tCmds, "SendNewName", 511)
  callMethod("setaProp", tCmds, "GenarateNames", 512)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _this), tCmds)
  }

}

