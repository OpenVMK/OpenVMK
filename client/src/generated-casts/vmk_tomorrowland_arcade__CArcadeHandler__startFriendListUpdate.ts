// vmk_tomorrowland_arcade.cct / CArcadeHandler / startFriendListUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startFriendListUpdate(_me: LingoMe) {
  setMeProp(_me, "m_iUpdateCounter", 0);
  callNamed("createTimeout", symbol("pinger"), lingoBinary("mul", lingoBinary("mul", 5, 60), 1000), symbol("PingerTimeOutUpdate"), callMethod("getID", _me), undefined, 0)
}

