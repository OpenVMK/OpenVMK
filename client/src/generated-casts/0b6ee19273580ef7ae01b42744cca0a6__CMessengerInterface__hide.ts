// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe) {
  setMeProp(_me, "m_bVisible", 0);
  if (lingoBinary("eq", meProp(_me, "m_sCurrentView"), "friendinfo")) {
  callMethod("inActivate", meProp(_me, "m_rAddressbookList"))
  callMethod("changeView", _me, "friendlist")
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("hide", meProp(_me, "m_rWindow"))
  }

  callMethod("stopPolling", callMethod("getComponent", _me))
  callMethod("setIconPulse", _me, 0)
}

