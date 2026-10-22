// vmk_pirates_minigame.cct / CPiratesMessageBar / hideMessageBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideMessageBar(_me: LingoMe) {
  callNamed("removeCannedField", meProp(_me, "m_sWndTitle"), "pirates.chat.field")
  callNamed("removeWindow", meProp(_me, "m_sWndTitle"))
}

