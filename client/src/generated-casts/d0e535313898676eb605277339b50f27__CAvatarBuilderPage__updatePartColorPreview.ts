// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / updatePartColorPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePartColorPreview(_me: LingoMe, _this: LingoValue, tPart: LingoValue, a_sColor: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("and", lingoBinary("neq", a_sColor, 0), lingoBinary("neq", a_sColor, -float(1)))) {
  var tColor = callNamed("rgb", a_sColor);
  } else {
  tColor = callNamed("rgb", 255, 255, 255);
  }

  var tElemID = lingoBinary("join", lingoBinary("join", "part.color.", tPart), ".preview");
  if (callNamed("voidp", tColor)) {
  tColor = callNamed("rgb", 255, 255, 255);
  }

  if (callMethod("elementExists", meProp(_me, "m_rWindow"), tElemID)) {
  setThePropOf(callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWindow"), tElemID), symbol("sprite")), "bgColor", tColor);
  }

  }

}

