// vmk_hm_minigame.cct / CHMGameInterface / ShowIdleKickWarning

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowIdleKickWarning(_me: LingoMe, a_iTime: LingoValue) {
  callMethod("HideIdleKickWarning", _me)
  if ((lingoTruthy(callNamed("DialogWindowExists", meProp(_me, "m_sKickWarningDlg"))) ? 0 : 1)) {
  callNamed("createDialogWindow", callMethod("getID", _me), meProp(_me, "m_sKickWarningDlg"), 1)
  }

  var tDialog = callNamed("getObject", meProp(_me, "m_sKickWarningDlg"));
  callMethod("show", tDialog)
  var t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "hmgame.kickouttimer_text_1"), a_iTime), callNamed("getText", "hmgame.kickouttimer_text_2"));
  var t_sTitle = callNamed("getText", "hmgame.kickouttimer_title");
  var t_sBtn = callNamed("getText", "hmgame.kickouttimer_btnOK");
  t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "hmg.dialog.kick.text1"), a_iTime), callNamed("getText", "hmg.dialog.kick.text2"));
  t_sTitle = callNamed("getText", "hmg.dialog.kick.title");
  t_sBtn = callNamed("getText", "hmg.dialog.kick.ok");
  callMethod("setText", tDialog, t_sTxt, t_sTitle, t_sBtn)
}

