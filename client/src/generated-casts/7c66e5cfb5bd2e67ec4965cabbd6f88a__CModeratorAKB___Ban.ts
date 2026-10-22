// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / _Ban

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Ban(_me: LingoMe, _this: LingoValue) {
  var t_sMsg = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.tousers.input"));
  var t_sLog = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.logmessage.input"));
  var t_iLog = -float(1);
  if (lingoBinary("and", (lingoTruthy(callNamed("objectp", callMethod("GetActive", meProp(_me, "m_rComponentsPage")))) ? 0 : 1), lingoBinary("eq", t_sLog.length, 0))) {
  var t_bLogToSave = 0;
  } else {
  if (callNamed("objectp", callMethod("GetActive", meProp(_me, "m_rComponentsPage")))) {
  t_iLog = callNamed("value", callMethod("getEvent", callMethod("GetActive", meProp(_me, "m_rComponentsPage"))));
  t_bLogToSave = 1;
  }

  }

  if (lingoBinary("eq", meProp(_me, "m_sName"), "")) {
  callMethod("CreateConfirmDialog", _this, "ban")
  } else {
  if (lingoBinary("lt", t_iLog, 0)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "select.ban.reason.dialog", 1, 1);
  var t_sTitle = callNamed("getText", "mods.akb.select.banreason.dialog.title", "ERROR");
  var t_sText = callNamed("getText", "mods.akb.select.banreason.dialog.text", "You need to select the reason why the player needs to be banned");
  var t_rBtn1 = callNamed("getText", "mods.akb.select.banreason.dialog.btnOK", "OK");
  callMethod("show", t)
  callMethod("setText", t, t_sText, t_sTitle, t_rBtn1)
  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "BanUser", new LingoPropList([symbol("string"), meProp(_me, "m_sName"), symbol("integer"), t_iLog, symbol("string"), t_sMsg, symbol("string"), t_sLog, symbol("integer"), meProp(_me, "m_iBanTime"), symbol("integer"), t_bLogToSave]))
  t_sLog = undefined;
  callMethod("_Remove", _this)
  }

  }

}

