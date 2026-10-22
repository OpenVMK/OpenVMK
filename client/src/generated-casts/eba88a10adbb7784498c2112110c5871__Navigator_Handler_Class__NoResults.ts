// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / NoResults

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NoResults(_me: LingoMe) {
  var tGuestRoomNavigator = callMethod("GetGuestRoomNavigator", callMethod("getInterface", _me));
  if ((lingoTruthy(callNamed("voidp", tGuestRoomNavigator)) ? 0 : 1)) {
  callMethod("createComponentWindow", tGuestRoomNavigator, new LingoList([]))
  }

}

