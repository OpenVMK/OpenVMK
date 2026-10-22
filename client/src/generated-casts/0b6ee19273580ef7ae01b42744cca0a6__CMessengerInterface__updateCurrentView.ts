// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / updateCurrentView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateCurrentView(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rCurrentView"))) {
  callMethod("updateContent", meProp(_me, "m_rCurrentView"))
  }

}

