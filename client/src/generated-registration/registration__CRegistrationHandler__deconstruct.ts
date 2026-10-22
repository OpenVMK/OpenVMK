// registration.cct / CRegistrationHandler / deconstruct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_bRegistrationGoingOn", 0);
  setMeProp(_me, "m_bNameRejected", 0);
  setMeProp(_me, "m_bContinueRegistrationAfterAcceptedName", 0);
  return 1;
}

