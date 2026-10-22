// vmk_hm_lobby_handler.cct / CHMLobbyInterface / kickedfromgame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function kickedfromgame(_me: LingoMe) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "hm_kicked_from_game", 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "hm.kicked.from.game"), "Haunted Mansion Game", "OK")
}

