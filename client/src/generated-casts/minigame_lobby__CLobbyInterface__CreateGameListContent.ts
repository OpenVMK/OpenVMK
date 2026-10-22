// minigame_lobby.cct / CLobbyInterface / CreateGameListContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateGameListContent(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rGameListView"))) ? 0 : 1)) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if (callNamed("objectp", tWndObj)) {
  var tElement = callMethod("getElement", tWndObj, "lobby_list_of_games");
  if (callNamed("objectp", tElement)) {
  callMethod("clear", meProp(_me, "m_rGameListView"))
  callMethod("SetItemWidth", meProp(_me, "m_rGameListView"), callMethod("getProperty", tElement, symbol("width")))
  var tGameList = callMethod("GetGameList", callMethod("getComponent", _me));
  for (var tGame of tGameList.toArray()) {
  var tID = callMethod("GetParameterValue", tGame.data, symbol("GameID"));
  var tName = callMethod("GetParameterValue", tGame.data, symbol("GameName"));
  callMethod("createItem", meProp(_me, "m_rGameListView"), lingoBinary("join", lingoBinary("join", tID, ", "), tName))
  }

  var tImage = callMethod("render", meProp(_me, "m_rGameListView"));
  callMethod("feedImage", tElement, tImage)
  }

  }

  setMeProp(_me, "m_iGameListSelection", undefined);
  }

}

