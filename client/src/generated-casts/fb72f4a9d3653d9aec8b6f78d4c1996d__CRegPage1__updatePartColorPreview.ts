// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / updatePartColorPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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

