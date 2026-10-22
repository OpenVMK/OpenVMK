// d0e535313898676eb605277339b50f27.cct / CSwimmerAvatarRender / GetShirtColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetShirtColor(_me: LingoMe) {
  var t_Col = callMethod("GetPartColor", meProp(_me, "m_arPartList")["ch"]);
  return t_Col;
}

