// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationComponent / GetHatList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetHatList(_me: LingoMe, _this: LingoValue, a_iHairID: LingoValue) {
  if (callNamed("stringp", a_iHairID)) {
  a_iHairID = callNamed("value", a_iHairID);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_HatList"))) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_HatList"), a_iHairID), undefined)) {
  return 1;
  } else {
  return 0;
  }

  } else {
  return 0;
  }

}

