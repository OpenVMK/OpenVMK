// d0e535313898676eb605277339b50f27.cct / CBodypartClass_rh / defineActMultiple

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function defineActMultiple(_me: LingoMe, tAct: LingoValue, tTargetPartList: LingoValue) {
  if (callMethod("getOne", tTargetPartList, meProp(_me, "m_sPart"))) {
  if (lingoBinary("eq", meProp(_me, "m_sAction"), "std")) {
  setMeProp(_me, "m_sAction", tAct);
  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_sPart"), "ey"), lingoBinary("eq", tAct, "std"))) {
  setMeProp(_me, "m_sAction", "std");
  }

  }

}

