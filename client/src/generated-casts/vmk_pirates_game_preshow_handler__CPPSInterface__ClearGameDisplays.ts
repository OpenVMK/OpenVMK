// vmk_pirates_game_preshow_handler.cct / CPPSInterface / ClearGameDisplays

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearGameDisplays(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player4"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player4"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "signup.level.team1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red2.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red2.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red2.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red2.player4"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue2.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue2.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue2.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue2.player4"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "signup.level.team2"), "")
}

