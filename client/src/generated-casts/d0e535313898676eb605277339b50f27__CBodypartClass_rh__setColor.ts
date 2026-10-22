// d0e535313898676eb605277339b50f27.cct / CBodypartClass_rh / setColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setColor(_me: LingoMe, tColor: LingoValue) {
  if (callNamed("voidp", tColor)) {
  return 0;
  }

  if (lingoBinary("eq", tColor, "")) {
  return 0;
  }

  if (lingoBinary("eq", callNamed("ilk", tColor), symbol("color"))) {
  meProp(_me, "m_mpDrawProps")[symbol("bgColor")] = tColor;
  } else {
  meProp(_me, "m_mpDrawProps")[symbol("bgColor")] = callNamed("rgb", 255, 255, 255);
  }

  if (lingoBinary("eq", meProp(_me, "m_sPart"), "ch2")) {
  meProp(_me, "m_mpDrawProps")[symbol("bgColor")] = callNamed("rgb", 255, 255, 255);
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_sPart"), "lsh"), lingoBinary("eq", tColor, 0))) {
  meProp(_me, "m_mpDrawProps")[symbol("bgColor")] = callNamed("rgb", 255, 255, 255);
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_sPart"), "rsh"), lingoBinary("eq", tColor, 0))) {
  meProp(_me, "m_mpDrawProps")[symbol("bgColor")] = callNamed("rgb", 255, 255, 255);
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_sPart"), "ey"), lingoBinary("eq", tColor, 0))) {
  meProp(_me, "m_mpDrawProps")[symbol("bgColor")] = callNamed("rgb", 255, 255, 255);
  }

  return 1;
}

