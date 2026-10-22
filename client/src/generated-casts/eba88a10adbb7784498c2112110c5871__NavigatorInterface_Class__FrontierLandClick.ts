// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / FrontierLandClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FrontierLandClick(_me: LingoMe, a_elemID: LingoValue) {
  switch (a_elemID) {
case "nav.tab.parkmap.passive":
  callMethod("ChangePage", _me, symbol("whatsnew"))
  break;
case "nav.tab.adventureland.passive":
  callMethod("ChangePage", _me, symbol("adventureland"))
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
case "nav.splashmountain":
case "nav.splashmountain.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 49)
  break;
case "nav.tomsawyer":
case "nav.tomsawyer.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 64)
  break;
case "nav.thundermountain":
case "nav.thundermountain.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 61)
  break;
case "nav.steamboat":
case "nav.steamboat.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 57)
  break;
case "nav.pier":
case "nav.pier.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 59)
  break;
case "nav.goldenhorseshoe":
case "nav.goldenhorseshoe.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 44)
  break;
case "nav.frontierland_hub":
case "nav.frontierland_hub.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 58)
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
  }

}

