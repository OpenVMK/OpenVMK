// registration.cct / CRegistrationHandler / NavigatorHandshaked

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NavigatorHandshaked(_me: LingoMe, _this: LingoValue) {
  callNamed("executeMessage", symbol("MinigameState"), symbol("idle"))
  callNamed("executeMessage", symbol("ui_show"))
  if (lingoBinary("or", lingoBinary("or", !lingoTruthy(meProp(_me, "m_bRegistrationGoingOn")), lingoBinary("eq", meProp(_me, "m_iLandingRoom"), -float(1))), meProp(_me, "m_bNameRejected"))) {
  callNamed("executeMessage", symbol("ui_navigator"))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("Messenger"), 1, symbol("Help"), 1, symbol("exit"), 1]))
  }

}

