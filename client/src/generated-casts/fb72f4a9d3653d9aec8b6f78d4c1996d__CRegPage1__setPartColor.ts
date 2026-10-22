// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / setPartColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPartColor(_me: LingoMe, _this: LingoValue, tPart: LingoValue, a_sColor: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", a_sColor, 0), lingoBinary("neq", a_sColor, -float(1)))) {
  var tColor = callNamed("rgb", a_sColor);
  } else {
  tColor = callNamed("rgb", 255, 255, 255);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects"))) ? 0 : 1)) {
  callNamed("call", symbol("setColor"), meProp(_me, "m_ar_BodyPartObjects")[tPart], tColor)
  }

  callMethod("updateFigurePreview", _this)
  callMethod("updateAllPrewIcons", _this)
}

