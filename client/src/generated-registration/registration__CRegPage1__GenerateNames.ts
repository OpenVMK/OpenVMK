// registration.cct / CRegPage1 / GenerateNames

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GenerateNames(_me: LingoMe, _this: LingoValue) {
  callMethod("send", callNamed("getConnection", "VMK"), "GenarateNames")
}

