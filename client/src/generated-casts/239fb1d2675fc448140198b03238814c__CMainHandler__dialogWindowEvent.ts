// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  var t_rWnd = callNamed("getWindow", a_sDialogName);
  switch (a_sDialogName) {
case "InactivityAlert":
  callNamed("removeTimeout", "InactivityAlertTimer")
  callMethod("hide", t_rWnd)
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "activeresponse")
  break;
case "AdminMessage":
  callMethod("hide", t_rWnd)
  break;
case "DictionaryError":
case "ConnectionLost":
  if (callNamed("textExists", "game.exit.url")) {
  var t_sExitURL = callNamed("getText", "game.exit.url");
  } else {
  t_sExitURL = "https://secure.disney.go.com/vmk/en_US/index?name=LoginPage";
  }

  callNamed("gotoNetPage", t_sExitURL, "_self")
  break;
  break;
  }

}

