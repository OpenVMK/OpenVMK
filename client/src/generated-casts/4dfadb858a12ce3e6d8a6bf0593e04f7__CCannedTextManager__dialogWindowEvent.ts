// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  if (callNamed("textExists", "game.exit.url")) {
  var t_sExitURL = callNamed("getText", "game.exit.url");
  } else {
  t_sExitURL = "https://secure.disney.go.com/vmk/en_US/index?name=LoginPage";
  }

  callNamed("gotoNetPage", t_sExitURL, "_self")
}

