// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / SetCarPantAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetCarPantAction(_me: LingoMe, a_iCarPantAction: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  if (lingoBinary("eq", a_iCarPantAction, 1)) {
  setThePropOf(_me, "m_sCarPantAction", "wlk");
  }

  setThePropOf(_me, "m_sCarPantAction", "std");
}

