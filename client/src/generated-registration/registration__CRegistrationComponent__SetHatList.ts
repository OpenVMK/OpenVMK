// registration.cct / CRegistrationComponent / SetHatList

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetHatList(_me: LingoMe, _this: LingoValue, t_ar_HatList: LingoValue) {
  setMeProp(_me, "m_ar_HatList", t_ar_HatList);
}

