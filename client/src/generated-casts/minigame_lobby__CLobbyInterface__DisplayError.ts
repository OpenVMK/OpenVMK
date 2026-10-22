// minigame_lobby.cct / CLobbyInterface / DisplayError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayError(_me: LingoMe, a_sText: LingoValue) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "LobbyError", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, a_sText, callNamed("getText", "lobby.error.title"), "OK")
}

