// vmk_tomorrowland_arcade.cct / CArcadeHandler / PingerTimeOutUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PingerTimeOutUpdate(_me: LingoMe) {
  setMeProp(_me, "m_iUpdateCounter", lingoBinary("add", meProp(_me, "m_iUpdateCounter"), 1));
  if (lingoBinary("lt", meProp(_me, "m_iUpdateCounter"), 200)) {
  callMethod("send", callNamed("getConnection", "VMK"), 12)
  } else {
  callMethod("RemovePingerUpdate", _me)
  }

}

