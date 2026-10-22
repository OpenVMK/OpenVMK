// registration.cct / CRegPage1 / ParseMyAvatar

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseMyAvatar(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  setMeProp(_me, "m_ar_PropsToServer", callMethod("ParseFigure", _this, tMsg));
}

