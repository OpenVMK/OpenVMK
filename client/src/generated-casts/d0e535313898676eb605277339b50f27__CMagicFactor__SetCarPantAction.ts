// d0e535313898676eb605277339b50f27.cct / CMagicFactor / SetCarPantAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetCarPantAction(_me: LingoMe, a_iCarPantAction: LingoValue) {
  if (lingoBinary("eq", a_iCarPantAction, 1)) {
  setMeProp(_me, "m_sCarPantAction", "wlk");
  } else {
  setMeProp(_me, "m_sCarPantAction", "std");
  }

}

