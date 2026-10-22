// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  if (lingoBinary("eq", a_sDialogName, "ConfirmExit")) {
  switch (a_sDialogEvent) {
case symbol("dialogOK"):
  if (callNamed("textExists", "game.exit.url")) {
  var t_sExitURL = callNamed("getText", "game.exit.url");
  callNamed("gotoNetPage", t_sExitURL, "_self")
  }

  break;
case symbol("dialogCancel"):
  break;
  }

  }

}

