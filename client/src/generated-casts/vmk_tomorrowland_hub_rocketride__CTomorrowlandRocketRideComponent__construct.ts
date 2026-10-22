// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bReady", 0);
  setMeProp(_me, "m_ar_hiddenAvatars", new LingoList([]));
  callNamed("registerMessage", symbol("room_animations_ready"), callMethod("getID", _me), symbol("Init"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("Release"))
  callNamed("registerMessage", symbol("animation_freezed"), callMethod("getID", _me), symbol("animationFreezed"))
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

