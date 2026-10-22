// vmk_fireworks_preshow_handler.cct / CFWPSComponent / deconstruct

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
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_particleSystem")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rFireworksEngine")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_softBuffer")))
  for (var tSpark of meProp(_me, "m_mp_sparkList").toArray()) {
  callNamed("removeObject", callMethod("getID", tSpark))
  }

  callNamed("releaseSprite", meProp(_me, "m_viewImgSprite").spriteNum)
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("DisableHighScore")
  return 1;
}

