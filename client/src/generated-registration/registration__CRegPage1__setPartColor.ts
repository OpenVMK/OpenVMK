// registration.cct / CRegPage1 / setPartColor

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPartColor(_me: LingoMe, _this: LingoValue, tPart: LingoValue, a_sColor: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", a_sColor, 0), lingoBinary("neq", a_sColor, -float(1)))) {
  var tColor = callNamed("rgb", a_sColor);
  } else {
  tColor = callNamed("rgb", 255, 255, 255);
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects")))) {
  callNamed("call", symbol("setColor"), meProp(_me, "m_ar_BodyPartObjects")[tPart], tColor)
  }

  callMethod("updateFigurePreview", _this)
  callMethod("updateAllPrewIcons", _this)
}

