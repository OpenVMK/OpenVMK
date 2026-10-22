// registration.cct / CRegistrationHandler / construct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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

