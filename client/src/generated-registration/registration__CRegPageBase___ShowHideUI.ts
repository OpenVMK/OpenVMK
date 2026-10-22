// registration.cct / CRegPageBase / _ShowHideUI

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ShowHideUI(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bVisible")) {
  callMethod("close", _this)
  } else {
  callMethod("open", _this)
  }

}

