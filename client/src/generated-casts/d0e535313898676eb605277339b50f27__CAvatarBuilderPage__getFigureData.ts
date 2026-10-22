// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / getFigureData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFigureData(_me: LingoMe, _this: LingoValue, a_sData: LingoValue, a_sSetName: LingoValue) {
  if (callNamed("voidp", a_sData)) {
  return meProp(_me, "m_ar_PropsToServer");
  }

  switch (a_sData) {
case "SetID":
  if (callNamed("voidp", a_sSetName)) {
  return callNamed("error", _this, "Set name missing!", symbol("getFigureData"));
  }

  return meProp(_me, "m_ar_PropsToServer")[a_sSetName]["SetID"];
case "Color":
  if (callNamed("voidp", a_sSetName)) {
  return callNamed("error", _this, "Set name missing!", symbol("getFigureData"));
  }

  return meProp(_me, "m_ar_PropsToServer")[a_sSetName]["Color"];
case "Figure":
  if (callNamed("voidp", a_sSetName)) {
  return callNamed("error", _this, "Set name missing!", symbol("getFigureData"));
  }

  return meProp(_me, "m_ar_PropsToServer")[a_sSetName]["Figure"];
  }

}

