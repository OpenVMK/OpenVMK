// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var tObject = callNamed("getObject", "Navigation.Room.Queue");
  if (lingoBinary("neq", tObject, 0)) {
  callNamed("removeObject", callMethod("getID", tObject))
  }

  callNamed("unregisterMessage", symbol("LandingOnRoom"))
  if (callNamed("objectp", meProp(_me, "m_pAdvancedNavItemList"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pAdvancedNavItemList")))
  }

}

