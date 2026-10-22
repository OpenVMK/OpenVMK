// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / GetGuestRoomNavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetGuestRoomNavigator(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_pGuestRoomNavigator"))) {
  setMeProp(_me, "m_pGuestRoomNavigator", callNamed("createObject", symbol("random"), "CGuestRoomNavigator"));
  }

  return meProp(_me, "m_pGuestRoomNavigator");
}

