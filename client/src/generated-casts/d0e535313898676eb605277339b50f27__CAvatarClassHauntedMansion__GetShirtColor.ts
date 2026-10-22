// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / GetShirtColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetShirtColor(_me: LingoMe) {
  var t_iModel = callMethod("GetPartModel", meProp(_me, "m_arPartList")["ch"]);
  switch (t_iModel) {
case 90:
  var t_Col = callNamed("rgb", 255, 90, 183);
  break;
case 92:
  t_Col = callNamed("rgb", 64, 255, 49);
  break;
  }

  return t_Col;
}

