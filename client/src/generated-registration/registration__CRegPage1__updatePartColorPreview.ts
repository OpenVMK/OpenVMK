// registration.cct / CRegPage1 / updatePartColorPreview

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePartColorPreview(_me: LingoMe, _this: LingoValue, tPart: LingoValue, a_sColor: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", a_sColor, 0), lingoBinary("neq", a_sColor, -float(1)))) {
  var tColor = callNamed("rgb", a_sColor);
  }

  var tElemID = lingoBinary("join", lingoBinary("join", "part.color.", tPart), ".preview");
  if (callNamed("voidp", tColor)) {
  tColor = callNamed("rgb", 255, 255, 255);
  }

  var tWndObj = meProp(_me, "m_rWindow");
  if (callMethod("elementExists", tWndObj, tElemID)) {
  setThePropOf(callMethod("getProperty", callMethod("getElement", tWndObj, tElemID), symbol("sprite")), "bgColor", tColor);
  } else {
  }

}

