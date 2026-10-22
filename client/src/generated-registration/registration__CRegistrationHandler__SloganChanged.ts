// registration.cct / CRegistrationHandler / SloganChanged

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SloganChanged(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_sSlogan = callMethod("GetStrFrom", tMsg.connection);
}

