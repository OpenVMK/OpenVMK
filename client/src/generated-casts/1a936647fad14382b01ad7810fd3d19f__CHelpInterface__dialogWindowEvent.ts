// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Dialog Window Event", new LingoList([t_dialogName, t_dialogEvent])))
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  switch (t_dialogName) {
case "call_for_help_confirm.dialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  if (lingoBinary("neq", tWndObj, 0)) {
  var t_txt1 = callMethod("getText", callMethod("getElement", tWndObj, "hlp.harrasser.input"));
  var t_txt2 = callMethod("GetContent", meProp(_me, "m_rHelpField"));
  callMethod("callForHelp", callMethod("getHandler", _me), callMethod("getActiveElementID", meProp(_me, "m_pRadioButtons")), t_txt2, t_txt1)
  callNamed("executeMessage", symbol("open_help_page"), "help.messaging.control")
  }

  break;
  }

  break;
  }

}

