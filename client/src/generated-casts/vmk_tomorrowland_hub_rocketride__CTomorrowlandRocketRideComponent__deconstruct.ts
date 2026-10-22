// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_ar_hiddenAvatars", new LingoList([]));
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me), symbol("Init"))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me), symbol("Release"))
  return 1;
}

