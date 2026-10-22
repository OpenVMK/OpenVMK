// registration.cct / CRegistrationComponent / GetHatList

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetHatList(_me: LingoMe, _this: LingoValue, a_iHairID: LingoValue) {
  if (callNamed("stringp", a_iHairID)) {
  a_iHairID = callNamed("value", a_iHairID);
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_HatList")))) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_HatList"), a_iHairID), undefined)) {
  return 1;
  } else {
  return 0;
  }

  } else {
  return 0;
  }

}

