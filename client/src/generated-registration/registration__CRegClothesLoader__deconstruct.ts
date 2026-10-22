// registration.cct / CRegClothesLoader / deconstruct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_objLoadingWindow"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_objLoadingWindow")))
  }

  return 1;
}

