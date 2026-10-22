// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / AvailableSetsReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AvailableSetsReceived(_me: LingoMe, _this: LingoValue, a_mpAvailableSets: LingoValue) {
  if (callNamed("listp", a_mpAvailableSets)) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), a_mpAvailableSets, "AvailableSets")
  }

}

