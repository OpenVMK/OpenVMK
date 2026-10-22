// registration.cct / CRegistrationHandler / LandingRoom

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LandingRoom(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  setMeProp(_me, "m_iLandingRoom", callMethod("GetIntFrom", tMsg.connection));
  callNamed("executeMessage", symbol("LandingOnRoom"))
  return callMethod("_UpdateRegData", callMethod("getComponent", _this), meProp(_me, "m_iLandingRoom"), "LandingRoom");
}

