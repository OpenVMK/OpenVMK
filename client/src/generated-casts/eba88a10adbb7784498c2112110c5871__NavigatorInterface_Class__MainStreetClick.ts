// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / MainStreetClick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MainStreetClick(_me: LingoMe, a_elemID: LingoValue) {
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
case "nav.tab.neworleans.passive":
  callMethod("ChangePage", _me, symbol("neworleans"))
  break;
case "nav.castlecourtyard":
case "nav.castlecourtyard.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 35)
  break;
case "nav.hub2":
case "nav.hub2.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 2)
  break;
case "nav.vmkcentral":
case "nav.vmkcentral.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 41)
  break;
case "nav.musicjam":
case "nav.musicjam.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 42)
  break;
case "nav.musicalmainstreet":
case "nav.musicalmainstreet.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 4)
  break;
case "nav.emporium":
case "nav.emporium.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 43)
  break;
case "nav.mainstreetsquare":
case "nav.mainstreetsquare.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 3)
  break;
case "nav.esplanade":
case "nav.esplanade.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 48)
  break;
case "nav.buenavista":
case "nav.buenavista.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 72)
  break;
case "nav.pennyarcade":
case "nav.pennyarcade.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 140)
  break;
case "nav.magicshopcheckers":
case "nav.magicshopcheckers.active":
  callMethod("NavigateToRoom", callMethod("getComponent", _me), 1108)
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

