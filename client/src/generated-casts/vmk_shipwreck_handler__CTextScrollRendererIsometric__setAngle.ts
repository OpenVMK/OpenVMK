// vmk_shipwreck_handler.cct / CTextScrollRendererIsometric / setAngle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAngle(_me: LingoMe, i_angle: LingoValue) {
  if (callNamed("voidp", i_angle)) {
  setMeProp(_me, "m_iAngle", lingoBinary("div", lingoBinary("mul", 60, callNamed("pi")), float(180)));
  } else {
  setMeProp(_me, "m_iAngle", lingoBinary("div", lingoBinary("mul", i_angle, callNamed("pi")), float(180)));
  }

}

