// registration.cct / CRegistrationHandler / HairListForHats

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HairListForHats(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_iLength = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_HatList = new LingoList([]);
  for (var i = 1; i <= t_iLength; ++i) {
  callMethod("add", t_ar_HatList, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("SetHatList", callMethod("getComponent", _this), t_ar_HatList)
  setMeProp(_me, "m_bHatListReady", 1);
  callMethod("getAvailableSets", _this)
  return 1;
}

