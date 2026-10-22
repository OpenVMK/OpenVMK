// vmk_checkers_handler.cct / CVMKCheckersSpaceInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  for (var t_rSprite of meProp(_me, "m_ar_rSprites").toArray()) {
  callNamed("removeEventBroker", t_rSprite.spriteNum)
  }

  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _this))
  return 1;
}

