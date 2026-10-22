// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / NewOrleansClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NewOrleansClick(_me: LingoMe, a_elemID: LingoValue) {
  switch (a_elemID) {
case "nav.tab.parkmap.passive":
  callMethod("ChangePage", _me, symbol("whatsnew"))
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
case "nav.neworleanssquare":
case "nav.neworleanssquare.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 95)
  break;
case "nav.gallery":
case "nav.gallery.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 96)
  break;
case "nav.bluebayou":
case "nav.bluebayou.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 97)
  break;
case "nav.hauntedmansion":
case "nav.hauntedmansion.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 1104)
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
  }

}

