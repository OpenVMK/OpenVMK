// minigame_engine_potc2.cct / CGameHandler / regMsgList

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
  callMethod("setaProp", tMsgs, 2601, symbol("_GameStatusUpdate"))
  callMethod("setaProp", tMsgs, 2602, symbol("_GameCreateObject"))
  callMethod("setaProp", tMsgs, 2603, symbol("_GameUpdateObject"))
  callMethod("setaProp", tMsgs, 2604, symbol("_GameDeleteObject"))
  callMethod("setaProp", tMsgs, 2605, symbol("_GameObjectsList"))
  callMethod("setaProp", tMsgs, 2607, symbol("_GameLoadStage"))
  callMethod("setaProp", tMsgs, 2609, symbol("_GameFullStatusUpdate"))
  callMethod("setaProp", tMsgs, 2610, symbol("_GameCreateMyObject"))
  callMethod("setaProp", tMsgs, 2611, symbol("_GameStartStage"))
  callMethod("setaProp", tMsgs, 2612, symbol("_GameEndStage"))
  callMethod("setaProp", tMsgs, 2613, symbol("_GamePrepareRoom"))
  callMethod("setaProp", tMsgs, 2614, symbol("_GameParticipantList"))
  callMethod("setaProp", tMsgs, 2615, symbol("_GameInfoUpdate"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "action", 560)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}

