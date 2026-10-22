// registration.cct / CRegPage1 / setPartModel

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPartModel(_me: LingoMe, _this: LingoValue, tPart: LingoValue, tmodel: LingoValue) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects")))) {
  callNamed("call", symbol("setModel"), meProp(_me, "m_ar_BodyPartObjects")[tPart], tmodel)
  }

}

