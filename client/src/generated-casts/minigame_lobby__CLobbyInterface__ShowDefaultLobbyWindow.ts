// minigame_lobby.cct / CLobbyInterface / ShowDefaultLobbyWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowDefaultLobbyWindow(_me: LingoMe, i_bVisibility: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if (i_bVisibility) {
  if ((lingoTruthy(callNamed("objectp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sWindowName"), "vmk_basic.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to create lobby window", symbol("ShowDefaultLobbyWindow"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_lobby_test.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to merge lobby window interface", symbol("ShowDefaultLobbyWindow"));
  }

  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("LobbyEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("show", tWndObj)
  callMethod("center", tWndObj)
  setMeProp(_me, "m_rGameListView", callNamed("createObject", "LobbyGameListView", "CListView"));
  setMeProp(_me, "m_rPlayerListView", callNamed("createObject", "LobbyPlayerListView", "CListView"));
  setMeProp(_me, "m_rAttributeListView", callNamed("createObject", "LobbyAttribyteListView", "CListView"));
  setMeProp(_me, "m_rMyAttributeListView", callNamed("createObject", "LobbyMyAttributeListView", "CListView"));
  if (callNamed("voidp", meProp(_me, "m_rGameListView"))) {
  return callNamed("error", _me, "Failed to create list view", symbol("ShowDefaultLobbyWindow"));
  }

  if (callNamed("voidp", meProp(_me, "m_rPlayerListView"))) {
  return callNamed("error", _me, "Failed to create list view", symbol("ShowDefaultLobbyWindow"));
  }

  if (callNamed("voidp", meProp(_me, "m_rAttributeListView"))) {
  return callNamed("error", _me, "Failed to create list view", symbol("ShowDefaultLobbyWindow"));
  }

  if (callNamed("voidp", meProp(_me, "m_rMyAttributeListView"))) {
  return callNamed("error", _me, "Failed to create list view", symbol("ShowDefaultLobbyWindow"));
  }

  callMethod("SetItemHeight", meProp(_me, "m_rGameListView"), 15)
  callMethod("SetItemHeight", meProp(_me, "m_rPlayerListView"), 15)
  callMethod("SetItemHeight", meProp(_me, "m_rAttributeListView"), 15)
  callMethod("SetItemHeight", meProp(_me, "m_rMyAttributeListView"), 15)
  }

  }

  } else {
  if (callNamed("objectp", tWndObj)) {
  if ((lingoTruthy(callNamed("removeWindow", meProp(_me, "m_sWindowName"))) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to destroy lobby window", symbol("ShowDefaultLobbyWindow"));
  }

  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGameListView")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rPlayerListView")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rAttributeListView")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rMyAttributeListView")))
  setMeProp(_me, "m_iGameListSelection", undefined);
  setMeProp(_me, "m_iPlayerListSelection", undefined);
  setMeProp(_me, "m_iAttributeListSelection", undefined);
  setMeProp(_me, "m_iMyAttributeListSelection", undefined);
  }

  }

}

