// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / AdventureLandClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdventureLandClick(_me: LingoMe, a_elemID: LingoValue) {
  switch (a_elemID) {
case "nav.tab.parkmap.passive":
  callMethod("ChangePage", _me, symbol("whatsnew"))
  break;
case "nav.tab.frontierland.passive":
  callMethod("ChangePage", _me, symbol("frontierland"))
  break;
case "nav.tab.fantasyland.passive":
  callMethod("ChangePage", _me, symbol("fantasyland"))
  break;
case "nav.tab.tomorrowland.passive":
  callMethod("ChangePage", _me, symbol("tomorrowland"))
  break;
case "nav.tab.mainstreet.passive":
  callMethod("ChangePage", _me, symbol("mainstreet"))
  break;
case "nav.tab.neworleans.passive":
  callMethod("ChangePage", _me, symbol("neworleans"))
  break;
case "nav.piratesgame":
case "nav.piratesgame.active":
  callMethod("startMiniGame", _me, symbol("pirates"))
  break;
case "nav.shrunkennedsshop":
case "nav.shrunkennedsshop.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 16)
  break;
case "nav.bazaar":
case "nav.bazaar.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 5)
  break;
case "nav.treehouse":
case "nav.treehouse.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 36)
  break;
case "nav.tiki":
case "nav.tiki.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 7)
  break;
case "nav.cambodian":
case "nav.cambodian.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 6)
  break;
case "nav.dock":
case "nav.dock.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 11)
  break;
case "nav.indy":
case "nav.indy.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 8)
  break;
case "nav.tent":
case "nav.tent.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 9)
  break;
case "nav.safari":
case "nav.safari.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 10)
  break;
case "nav.advancedmode.off":
  callMethod("ToggleAdvancedMode", _me)
  callMethod("RequestNavigationNodes", callMethod("getComponent", _me), meProp(_me, "m_page"))
  break;
case "nav.advancedmode.on":
  callMethod("ToggleAdvancedMode", _me)
  callMethod("RequestNavigationNodes", callMethod("getComponent", _me), meProp(_me, "m_page"))
  break;
case "nav.advancedmode.hd":
  callMethod("ToggleAdvancedMode", _me)
  callMethod("RequestNavigationNodes", callMethod("getComponent", _me), meProp(_me, "m_page"))
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

}

