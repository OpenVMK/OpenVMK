// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMessage / SendMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendMessage(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_MessageIDList"), lingoBinary("join", a_sID, "_field"));
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_rModReplyField = meProp(_me, "m_mp_MessageIDList")[lingoBinary("join", a_sID, "_field")];
  if (callMethod("CheckContent", t_rModReplyField)) {
  var t_sTxt = callMethod("GetContent", t_rModReplyField);
  if (callNamed("stringp", t_sTxt)) {
  t_sTxt = callNamed("ParseCannedText", t_sTxt);
  }

  t_iPos = callMethod("findPos", meProp(_me, "m_mp_MessageIDList"), a_sID);
  if ((lingoTruthy(callNamed("voidp", t_iPos)) ? 0 : 1)) {
  var t_iID = meProp(_me, "m_mp_MessageIDList")[t_iPos];
  var t_mp_MsgToServer = new LingoPropList([]);
  callMethod("addProp", t_mp_MsgToServer, symbol("int"), t_iID)
  var tCannedBlock = callNamed("TransformCannedToMsg", t_sTxt);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", t_mp_MsgToServer, tKey, tvalue)
  }

  callMethod("addProp", t_mp_MsgToServer, symbol("int"), 1)
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "SendMessageToModerator", t_mp_MsgToServer)
  callMethod("_Remove", _this, a_sID)
  }

  } else {
  var t_pHelpDialog = callNamed("createDialogWindow", callMethod("getID", _this), "IllegalWordsInDescriptionDialog", 1, 1);
  callMethod("show", t_pHelpDialog)
  callMethod("setText", t_pHelpDialog, callNamed("getText", "hlp.dialog.illegalWords.text"), callNamed("getText", "hlp.dialog.illegalWords.title"), callNamed("getText", "hlp.dialog.illegalWords.btnConfirm"))
  }

  }

}

