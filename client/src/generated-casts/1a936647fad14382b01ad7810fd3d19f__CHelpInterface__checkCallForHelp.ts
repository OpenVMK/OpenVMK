// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / checkCallForHelp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkCallForHelp(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var t_txt2 = callMethod("getText", callMethod("getElement", tWndObj, "hlp.describe.input"));
  if (lingoBinary("eq", t_txt2, "")) {
  var t_pHelpDialog = callNamed("createDialogWindow", callMethod("getID", _me), "noDescriptionDialog", 1, 1);
  callMethod("show", t_pHelpDialog)
  callMethod("setText", t_pHelpDialog, callNamed("getText", "hlp.dialog.noDescription.text"), callNamed("getText", "hlp.dialog.noDescription.title"), callNamed("getText", "hlp.dialog.noDescription.btnConfirm"))
  } else {
  if (callMethod("CheckContent", meProp(_me, "m_rHelpField"))) {
  t_pHelpDialog = callNamed("createDialogWindow", callMethod("getID", _me), "call_for_help_confirm.dialog", 2, 1);
  callMethod("show", t_pHelpDialog)
  callMethod("setText", t_pHelpDialog, callNamed("getText", "hlp.dialog.confirmSend.text"), callNamed("getText", "hlp.dialog.confirmSend.title"), callNamed("getText", "hlp.dialog.confirmSend.btnCancel"), callNamed("getText", "hlp.dialog.confirmSend.btnConfirm"))
  } else {
  t_pHelpDialog = callNamed("createDialogWindow", callMethod("getID", _me), "IllegalWordsInDescriptionDialog", 1, 1);
  callMethod("show", t_pHelpDialog)
  callMethod("setText", t_pHelpDialog, callNamed("getText", "hlp.dialog.illegalWords.text"), callNamed("getText", "hlp.dialog.illegalWords.title"), callNamed("getText", "hlp.dialog.illegalWords.btnConfirm"))
  }

  }

}

