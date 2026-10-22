// registration.cct / CRegPage3 / setData

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setData(_me: LingoMe, _this: LingoValue, a_mpData: LingoValue) {
  setMeProp(_me, "m_mpDataToServer", a_mpData);
}

