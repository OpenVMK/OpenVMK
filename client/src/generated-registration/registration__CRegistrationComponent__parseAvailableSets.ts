// registration.cct / CRegistrationComponent / parseAvailableSets

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAvailableSets(_me: LingoMe, _this: LingoValue, a_Ar_Data: LingoValue, a_sSex: LingoValue) {
  if (callNamed("listp", a_Ar_Data)) {
  var t_ar_availableSets1 = a_Ar_Data;
  var t_ar_availableSets = new LingoPropList([]);
  if (callMethod("findPos", meProp(_me, "m_mp_RegData"), "AvailableSets")) {
  callMethod("addProp", meProp(_me, "m_mp_RegData")["AvailableSets"], a_sSex, t_ar_availableSets)
  } else {
  callMethod("addProp", meProp(_me, "m_mp_RegData"), "AvailableSets", new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_RegData")["AvailableSets"], a_sSex, t_ar_availableSets)
  }

  } else {
  return callNamed("error", _this, lingoBinary("joinPad", "Available set list is corrupted: ", a_Ar_Data), symbol("parseAvailableSets"));
  }

}

