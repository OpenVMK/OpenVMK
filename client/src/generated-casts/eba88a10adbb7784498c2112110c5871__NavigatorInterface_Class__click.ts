// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / click

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function click(_me: LingoMe, a_elemID: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sAdvancedModeWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sAdvancedModeWindowTitle"))
  }

  if (lingoBinary("eq", a_elemID, "close")) {
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("showhidenavigator", _me)
  } else {
  if (lingoBinary("eq", a_elemID, "help")) {
  callNamed("executeMessage", symbol("open_help_page"), "help.navigation.navigator")
  } else {
  if (lingoBinary("eq", a_elemID, "nav.guestrooms.button")) {
  callNamed("executeMessage", symbol("ui_navigator_guestroom"))
  callMethod("startGuestRoomNavigator", _me)
  } else {
  switch (meProp(_me, "m_page")) {
case symbol("parkmap"):
case symbol("whatsnew"):
  callNamed("executeMessage", symbol("ui_navigator_land"))
  callMethod("ParkMapClick", _me, a_elemID)
  break;
case symbol("adventureland"):
  callNamed("executeMessage", symbol("ui_navigator_land"))
  callMethod("AdventureLandClick", _me, a_elemID)
  break;
case symbol("frontierland"):
  callNamed("executeMessage", symbol("ui_navigator_land"))
  callMethod("FrontierLandClick", _me, a_elemID)
  break;
case symbol("fantasyland"):
  callNamed("executeMessage", symbol("ui_navigator_land"))
  callMethod("FantasyLandClick", _me, a_elemID)
  break;
case symbol("tomorrowland"):
  callNamed("executeMessage", symbol("ui_navigator_land"))
  callMethod("TomorrowLandClick", _me, a_elemID)
  break;
case symbol("mainstreet"):
  callNamed("executeMessage", symbol("ui_navigator_land"))
  callMethod("MainStreetClick", _me, a_elemID)
  break;
case symbol("neworleans"):
  callNamed("executeMessage", symbol("ui_navigator_land"))
  callMethod("NewOrleansClick", _me, a_elemID)
  break;
  break;
  }

  }

  }

  }

}

