// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / DisableLevelReqMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisableLevelReqMsg(_me: LingoMe, _this: LingoValue) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_rList = new LingoPropList([]);
  callMethod("setaProp", t_rList, 2908, symbol("HandleLevelRequirementNotMetMessage"))
  callNamed("unregisterListener", t_sID, callMethod("getID", _this), t_rList)
  setMeProp(_me, "m_bLevelReqMsgEnabled", 0);
}

