// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_bHatListReady", 0);
  setMeProp(_me, "m_bAvailableSetsReady", 0);
  setMeProp(_me, "m_bRegistrationGoingOn", 0);
  setMeProp(_me, "m_bNameRejected", 0);
  setMeProp(_me, "m_iLandingRoom", -float(1));
  setMeProp(_me, "m_bContinueRegistrationAfterAcceptedName", 0);
  callMethod("regMsgList", _this, 1)
  return 1;
}

