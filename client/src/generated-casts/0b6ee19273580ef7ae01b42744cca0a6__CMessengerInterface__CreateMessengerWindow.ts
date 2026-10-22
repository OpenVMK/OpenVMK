// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / CreateMessengerWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateMessengerWindow(_me: LingoMe) {
  var t_bWindowOk = callNamed("createWindow", meProp(_me, "m_sWindowName"));
  if (t_bWindowOk) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", meProp(_me, "m_sWindowName")));
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_mes.window")
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _me))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("center", meProp(_me, "m_rWindow"))
  callMethod("show", meProp(_me, "m_rWindow"))
  }

}

