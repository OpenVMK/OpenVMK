// d0e535313898676eb605277339b50f27.cct / CSettingsPage / _SendChanges

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SendChanges(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bChanges")) {
  callMethod("set", callNamed("getObject", symbol("session")), "music", meProp(_me, "m_bMusic"))
  callMethod("set", callNamed("getObject", symbol("session")), "fx", meProp(_me, "m_bFx"))
  callMethod("set", callNamed("getObject", symbol("session")), "ui", meProp(_me, "m_bUi"))
  callMethod("set", callNamed("getObject", symbol("session")), "volume", meProp(_me, "m_iVolume"))
  callMethod("set", callNamed("getObject", symbol("session")), "tutorial", meProp(_me, "m_bTutorial"))
  callMethod("set", callNamed("getObject", symbol("session")), "traderequests", meProp(_me, "m_bTradeReq"))
  callMethod("SetSoundSettings", callMethod("getHandler", callNamed("getThread", "sound")))
  if (lingoBinary("eq", meProp(_me, "m_iPrviousVolume"), 0)) {
  callNamed("executeMessage", "LoadRoomSound")
  }

  }

  callNamed("executeMessage", "close_Settings")
}

