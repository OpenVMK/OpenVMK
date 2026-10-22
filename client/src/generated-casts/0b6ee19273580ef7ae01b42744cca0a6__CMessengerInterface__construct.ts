// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_sWindowName", "Messenger.Window");
  setMeProp(_me, "m_rPulser", undefined);
  setMeProp(_me, "m_iMessengerState", symbol("normal"));
  setMeProp(_me, "m_sCurrentView", "friendlist");
  callNamed("registerMessage", symbol("MinigameState"), callMethod("getID", _me), symbol("MinigameMessage"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("checkMessengerState"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("hideMessenger"))
  callNamed("registerMessage", symbol("ui_messenger"), callMethod("getID", _me), symbol("showHide"))
  return 1;
}

