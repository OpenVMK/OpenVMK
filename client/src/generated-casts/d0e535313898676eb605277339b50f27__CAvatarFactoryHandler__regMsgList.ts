// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / regMsgList

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
  callMethod("setaProp", tMsgs, 2501, symbol("getAvailableSets"))
  callMethod("setaProp", tMsgs, 2505, symbol("getAvatarData"))
  callMethod("setaProp", tMsgs, 2513, symbol("SloganChanged"))
  callMethod("setaProp", tMsgs, 2528, symbol("ActivateTeleport"))
  callMethod("setaProp", tMsgs, 2585, symbol("AvatarMoved"))
  callMethod("setaProp", tMsgs, 2512, symbol("HairListForHats"))
  callMethod("setaProp", tMsgs, 2772, symbol("foundHiddenMickeyList"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "GETFIGURELIST", 501)
  callMethod("setaProp", tCmds, "CHANGEFIGURE", 504)
  callMethod("setaProp", tCmds, "REQUESTDATA", 505)
  callMethod("setaProp", tCmds, "ChangeSlogan", 506)
  callMethod("setaProp", tCmds, "StartAction", 582)
  callMethod("setaProp", tCmds, "StopAction", 583)
  callMethod("setaProp", tCmds, "MagicTeleport", 529)
  callMethod("setaProp", tCmds, "RequestHiddenMickeyList", 773)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

