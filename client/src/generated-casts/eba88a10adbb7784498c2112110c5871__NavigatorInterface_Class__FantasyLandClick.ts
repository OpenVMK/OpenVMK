// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / FantasyLandClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FantasyLandClick(_me: LingoMe, a_elemID: LingoValue) {
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
case "nav.tab.tomorrowland.passive":
  callMethod("ChangePage", _me, symbol("tomorrowland"))
  break;
case "nav.tab.mainstreet.passive":
  callMethod("ChangePage", _me, symbol("mainstreet"))
  break;
case "nav.tab.neworleans.passive":
  callMethod("ChangePage", _me, symbol("neworleans"))
  break;
case "nav.fireworks":
case "nav.fireworks.active":
  callMethod("startMiniGame", _me, symbol("fireworks"))
  break;
case "nav.castlebanquet":
case "nav.castlebanquet.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 34)
  break;
case "nav.snowwhite":
case "nav.snowwhite.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 37)
  break;
case "nav.matterhorn":
case "nav.matterhorn.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 33)
  break;
case "nav.castleentrance":
case "nav.castleentrance.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 31)
  break;
case "nav.smallworld":
case "nav.smallworld.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 38)
  break;
case "nav.inthesky":
case "nav.inthesky.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 39)
  break;
case "nav.castlemoneyshot":
case "nav.castlemoneyshot.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 30)
  break;
case "nav.castledungeon":
case "nav.castledungeon.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 13)
  break;
case "nav.storybookland":
case "nav.storybookland.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 40)
  break;
case "nav.fantasycourtyard":
case "nav.fantasycourtyard.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 99)
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
  break;
  }

}

