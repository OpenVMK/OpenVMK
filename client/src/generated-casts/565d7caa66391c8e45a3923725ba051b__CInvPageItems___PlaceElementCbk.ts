// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageItems / _PlaceElementCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PlaceElementCbk(_me: LingoMe, _this: LingoValue, a_iBelow: LingoValue, a_vePos: LingoValue) {
  callNamed("unregisterMessage", "place_element_end", callMethod("getID", _this))
  callNamed("unregisterMessage", "place_element_failed", callMethod("getID", _this))
  callNamed("executeMessage", "show_inventory")
  if (callNamed("integerp", a_iBelow)) {
  var t_rParams = new LingoPropList([symbol("int"), callMethod("GetSelected", _this).ref, symbol("int"), a_iBelow, symbol("int"), callNamed("integer", a_vePos.x), symbol("int"), callNamed("integer", a_vePos.y), symbol("int"), callNamed("integer", a_vePos.z)]);
  callMethod("send", callNamed("getConnection", "VMK"), "PlaceItem", t_rParams)
  }

}

