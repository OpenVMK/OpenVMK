// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationComponent / parseAvailableSets

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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

