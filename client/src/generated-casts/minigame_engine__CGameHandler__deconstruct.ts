// minigame_engine.cct / CGameHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, 2601, symbol("_GameStatusUpdate"))
  callMethod("setaProp", t_rList, 2602, symbol("_GameCreateObject"))
  callMethod("setaProp", t_rList, 2603, symbol("_GameUpdateObject"))
  callMethod("setaProp", t_rList, 2604, symbol("_GameDeleteObject"))
  callMethod("setaProp", t_rList, 2605, symbol("_GameObjectsList"))
  callMethod("setaProp", t_rList, 2607, symbol("_GameLoadStage"))
  callMethod("setaProp", t_rList, 2609, symbol("_GameFullStatusUpdate"))
  callMethod("setaProp", t_rList, 2610, symbol("_GameCreateMyObject"))
  callMethod("setaProp", t_rList, 2611, symbol("_GameStartStage"))
  callMethod("setaProp", t_rList, 2612, symbol("_GameEndStage"))
  callMethod("setaProp", t_rList, 2613, symbol("_GamePrepareRoom"))
  callMethod("setaProp", t_rList, 2614, symbol("_GameParticipantList"))
  callNamed("unregisterListener", t_sID, callMethod("getID", _this), t_rList)
  t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, "action", 560)
  callNamed("unregisterCommands", t_sID, callMethod("getID", _this), t_rList)
  return 1;
}

