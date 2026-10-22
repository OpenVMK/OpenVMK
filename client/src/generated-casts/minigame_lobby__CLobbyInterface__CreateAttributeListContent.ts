// minigame_lobby.cct / CLobbyInterface / CreateAttributeListContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateAttributeListContent(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rAttributeListView"))) ? 0 : 1)) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if (callNamed("objectp", tWndObj)) {
  var tElement = callMethod("getElement", tWndObj, "lobby_attribute_list");
  if (callNamed("objectp", tElement)) {
  var tCurrentGame = callMethod("CurrentGame", callMethod("getComponent", _me));
  callMethod("clear", meProp(_me, "m_rAttributeListView"))
  callMethod("SetItemWidth", meProp(_me, "m_rAttributeListView"), callMethod("getProperty", tElement, symbol("width")))
  if (callNamed("objectp", tCurrentGame)) {
  var tAttributeMap = callMethod("GetParameterList", tCurrentGame);
  for (var i = 1; i <= tAttributeMap.count; ++i) {
  var tID = callMethod("getPropAt", tAttributeMap, i);
  var tDescription = callMethod("GetParameterDescription", tCurrentGame, tID);
  var tvalue = callMethod("GetParameterValue", tCurrentGame, tID);
  callMethod("createItem", meProp(_me, "m_rAttributeListView"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", tID, ", "), tDescription), ": "), tvalue))
  }

  var tImage = callMethod("render", meProp(_me, "m_rAttributeListView"));
  callMethod("feedImage", tElement, tImage)
  }

  }

  }

  }

}

