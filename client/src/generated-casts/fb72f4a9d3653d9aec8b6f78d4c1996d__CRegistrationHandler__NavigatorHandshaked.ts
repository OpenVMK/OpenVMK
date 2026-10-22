// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / NavigatorHandshaked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NavigatorHandshaked(_me: LingoMe, _this: LingoValue) {
  callNamed("executeMessage", symbol("MinigameState"), symbol("idle"))
  callNamed("executeMessage", symbol("ui_show"))
  if (lingoBinary("or", lingoBinary("or", (lingoTruthy(meProp(_me, "m_bRegistrationGoingOn")) ? 0 : 1), lingoBinary("eq", meProp(_me, "m_iLandingRoom"), -float(1))), meProp(_me, "m_bNameRejected"))) {
  callNamed("executeMessage", symbol("ui_navigator"))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("Messenger"), 1, symbol("Help"), 1, symbol("exit"), 1]))
  }

}

