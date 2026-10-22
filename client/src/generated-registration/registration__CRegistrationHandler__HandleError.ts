// registration.cct / CRegistrationHandler / HandleError

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleError(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "ERROR", tMsg))
}

