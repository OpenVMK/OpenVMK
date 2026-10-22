// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / SetTabs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTabs(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  switch (meProp(_me, "m_page")) {
case symbol("popular"):
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.popguestrooms.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.friendsrooms.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.ownrooms.active"))
  break;
case symbol("friends"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.popguestrooms.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.friendsrooms.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.ownrooms.active"))
  break;
case symbol("own"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.popguestrooms.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.friendsrooms.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.ownrooms.active"))
  break;
  }

}

