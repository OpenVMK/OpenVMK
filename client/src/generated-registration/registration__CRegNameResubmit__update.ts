// registration.cct / CRegNameResubmit / update

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  var m_ar_AvatarData = a_mp_kType_mp_iRef_rItem;
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  switch (a_kAlteredCategory) {
case "GeneratedNames":
  callMethod("_PopulateNameList", _this, m_ar_AvatarData["GeneratedNames"])
  break;
  }

  }

}

