// vmk_hm_minigame.cct / CHMWindowNotice / deconstruct

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
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowName")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rNotification"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rNotification").spriteNum)
  }

  return 1;
}

