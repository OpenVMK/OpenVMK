// minigame_lobby.cct / CLobbyInterface / RefreshDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RefreshDisplay(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if (callNamed("objectp", tWndObj)) {
  var tElement = callMethod("getElement", tWndObj, "lobby_list_of_games");
  if (callNamed("objectp", tElement)) {
  var tImage = callMethod("render", meProp(_me, "m_rGameListView"));
  callMethod("feedImage", tElement, tImage)
  }

  tElement = callMethod("getElement", tWndObj, "lobby_current_game_players");
  if (callNamed("objectp", tElement)) {
  tImage = callMethod("render", meProp(_me, "m_rPlayerListView"));
  callMethod("feedImage", tElement, tImage)
  }

  tElement = callMethod("getElement", tWndObj, "lobby_attribute_list");
  if (callNamed("objectp", tElement)) {
  tImage = callMethod("render", meProp(_me, "m_rAttributeListView"));
  callMethod("feedImage", tElement, tImage)
  }

  tElement = callMethod("getElement", tWndObj, "lobby_my_attributes");
  if (callNamed("objectp", tElement)) {
  tImage = callMethod("render", meProp(_me, "m_rMyAttributeListView"));
  callMethod("feedImage", tElement, tImage)
  }

  }

}

