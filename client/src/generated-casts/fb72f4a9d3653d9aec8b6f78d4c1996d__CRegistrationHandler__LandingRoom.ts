// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / LandingRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LandingRoom(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  setMeProp(_me, "m_iLandingRoom", callMethod("GetIntFrom", tMsg.connection));
  callNamed("executeMessage", symbol("LandingOnRoom"))
  return callMethod("_UpdateRegData", callMethod("getComponent", _this), meProp(_me, "m_iLandingRoom"), "LandingRoom");
}

