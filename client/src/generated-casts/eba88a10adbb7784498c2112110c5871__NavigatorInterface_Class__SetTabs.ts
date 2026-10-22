// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / SetTabs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTabs(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  switch (meProp(_me, "m_page")) {
case symbol("parkmap"):
case symbol("whatsnew"):
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.parkmap.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.adventureland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.frontierland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.fantasyland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.tomorrowland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.mainstreet.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.neworleans.active"))
  break;
case symbol("adventureland"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.parkmap.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.adventureland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.frontierland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.fantasyland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.tomorrowland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.mainstreet.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.neworleans.active"))
  break;
case symbol("frontierland"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.parkmap.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.adventureland.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.frontierland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.fantasyland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.tomorrowland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.mainstreet.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.neworleans.active"))
  break;
case symbol("fantasyland"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.parkmap.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.adventureland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.frontierland.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.fantasyland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.tomorrowland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.mainstreet.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.neworleans.active"))
  break;
case symbol("tomorrowland"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.parkmap.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.adventureland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.frontierland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.fantasyland.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.tomorrowland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.mainstreet.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.neworleans.active"))
  break;
case symbol("mainstreet"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.parkmap.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.adventureland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.frontierland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.fantasyland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.tomorrowland.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.mainstreet.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.neworleans.active"))
  break;
case symbol("neworleans"):
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.parkmap.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.adventureland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.frontierland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.fantasyland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.tomorrowland.active"))
  callMethod("hide", callMethod("getElement", tWndObj, "nav.tab.mainstreet.active"))
  callMethod("show", callMethod("getElement", tWndObj, "nav.tab.neworleans.active"))
  break;
  break;
  }

}

