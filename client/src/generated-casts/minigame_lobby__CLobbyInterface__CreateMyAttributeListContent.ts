// minigame_lobby.cct / CLobbyInterface / CreateMyAttributeListContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateMyAttributeListContent(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rMyAttributeListView"))) ? 0 : 1)) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if (callNamed("objectp", tWndObj)) {
  var tElement = callMethod("getElement", tWndObj, "lobby_my_attribute_list");
  if (callNamed("objectp", tElement)) {
  callMethod("clear", meProp(_me, "m_rMyAttributeListView"))
  callMethod("SetItemWidth", meProp(_me, "m_rMyAttributeListView"), callMethod("getProperty", tElement, symbol("width")))
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  var tMe = callMethod("GetByAvatarRef", callMethod("GetCurrentGame", callMethod("getComponent", _me)), tMyAvatarRef);
  if (callNamed("objectp", tMe)) {
  var tAttributeMap = callMethod("GetParameterList", tMe);
  for (var i = 1; i <= tAttributeMap.count; ++i) {
  var tID = callMethod("getPropAt", tAttributeMap, i);
  var tDescription = callMethod("GetParameterDescription", tMe, tID);
  var tvalue = callMethod("GetParameterValue", tMe, tID);
  callMethod("createItem", meProp(_me, "m_rMyAttributeListView"), lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", tID, ", "), tDescription), ": "), tvalue))
  }

  var tImage = callMethod("render", meProp(_me, "m_rMyAttributeListView"));
  callMethod("feedImage", tElement, tImage)
  }

  }

  }

  }

}

