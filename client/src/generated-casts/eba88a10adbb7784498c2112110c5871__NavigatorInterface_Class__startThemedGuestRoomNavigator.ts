// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / startThemedGuestRoomNavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startThemedGuestRoomNavigator(_me: LingoMe) {
  callNamed("executeMessage", "PlayInterfaceSound", "map-tab-change")
  callNamed("executeMessage", symbol("ui_Fastpass"))
  if (callNamed("voidp", meProp(_me, "m_pThemedGuestRoomNavigator"))) {
  setMeProp(_me, "m_pThemedGuestRoomNavigator", callNamed("createObject", symbol("random"), "CThemedGuestRoomNavigator"));
  callMethod("showHide", meProp(_me, "m_pThemedGuestRoomNavigator"))
  } else {
  callMethod("showHide", meProp(_me, "m_pThemedGuestRoomNavigator"))
  }

}

