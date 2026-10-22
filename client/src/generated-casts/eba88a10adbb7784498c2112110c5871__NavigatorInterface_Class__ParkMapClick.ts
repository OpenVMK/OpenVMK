// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / ParkMapClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParkMapClick(_me: LingoMe, a_elemID: LingoValue) {
  switch (a_elemID) {
case "nav.frontierland":
case "nav.frontierland.active":
  callMethod("ChangePage", _me, symbol("frontierland"))
  break;
case "nav.guestrooms":
case "nav.guestrooms.active":
  callMethod("startGuestRoomNavigator", _me)
  break;
case "nav.fantasyland":
case "nav.fantasyland.active":
  callMethod("ChangePage", _me, symbol("fantasyland"))
  break;
case "nav.adventureland":
case "nav.adventureland.active":
  callMethod("ChangePage", _me, symbol("adventureland"))
  break;
case "nav.mainstreet":
case "nav.mainstreet.active":
  callMethod("ChangePage", _me, symbol("mainstreet"))
  break;
case "nav.tomorrowland":
case "nav.tomorrowland.active":
  callMethod("ChangePage", _me, symbol("tomorrowland"))
  break;
case "nav.neworleans":
case "nav.neworleans.active":
  callMethod("ChangePage", _me, symbol("neworleans"))
  break;
case "nav.shortcut_1":
  callMethod("OpenShortCut", _me, 1)
  break;
case "nav.shortcut_2":
  callMethod("OpenShortCut", _me, 2)
  break;
case "nav.shortcut_3":
  callMethod("OpenShortCut", _me, 3)
  break;
case "nav.shortcut_4":
  callMethod("OpenShortCut", _me, 4)
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
case "nav.tab.adventureland.passive":
  callMethod("ChangePage", _me, symbol("adventureland"))
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
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

}

