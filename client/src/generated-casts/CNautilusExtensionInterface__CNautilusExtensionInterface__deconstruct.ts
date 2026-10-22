// CNautilusExtensionInterface.cct / CNautilusExtensionInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initRoom"))
  for (var tSprite of meProp(_me, "m_ar_eventSprites").toArray()) {
  callNamed("removeEventBroker", tSprite.spriteNum)
  }

  return 1;
}

