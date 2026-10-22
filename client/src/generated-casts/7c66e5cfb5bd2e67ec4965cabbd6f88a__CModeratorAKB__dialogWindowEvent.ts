// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_rParameter: LingoValue) {
  var t_sMsg = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.tousers.input"));
  var t_sLog = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.logmessage.input"));
  if (lingoBinary("and", (lingoTruthy(callNamed("objectp", callMethod("GetActive", meProp(_me, "m_rComponentsPage")))) ? 0 : 1), lingoBinary("eq", t_sLog.length, 0))) {
  var t_bLogToSave = 0;
  } else {
  if (callNamed("objectp", callMethod("GetActive", meProp(_me, "m_rComponentsPage")))) {
  var t_iLog = callNamed("value", callMethod("getEvent", callMethod("GetActive", meProp(_me, "m_rComponentsPage"))));
  t_bLogToSave = 1;
  }

  }

  switch (t_dialogName) {
case "AlertQueue":
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  t_sMsg = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.tousers.input"));
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "AlertQueue", new LingoPropList([symbol("string"), t_sMsg]))
  callMethod("_Remove", _me)
  }

  break;
case "AlerRoom":
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "SendAlertToRoom", new LingoPropList([symbol("integer"), t_iLog, symbol("string"), t_sMsg, symbol("string"), t_sLog, symbol("integer"), t_bLogToSave]))
  t_sLog = undefined;
  callMethod("_Remove", _me)
  }

  break;
case "KickRoom":
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "KickRoom", new LingoPropList([symbol("integer"), t_iLog, symbol("string"), t_sMsg, symbol("string"), t_sLog, symbol("integer"), t_bLogToSave]))
  t_sLog = undefined;
  callMethod("_Remove", _me)
  }

  break;
case "BanRoom":
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "BanRoom", new LingoPropList([symbol("integer"), t_iLog, symbol("string"), t_sMsg, symbol("string"), t_sLog, symbol("integer"), meProp(_me, "m_iBanTime"), symbol("integer"), t_bLogToSave]))
  t_sLog = undefined;
  callMethod("_Remove", _me)
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

