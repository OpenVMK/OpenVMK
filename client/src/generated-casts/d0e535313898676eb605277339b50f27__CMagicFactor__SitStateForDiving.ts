// d0e535313898676eb605277339b50f27.cct / CMagicFactor / SitStateForDiving

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SitStateForDiving(_me: LingoMe, a_bSitting: LingoValue) {
  setMeProp(_me, "m_bSitting", a_bSitting);
}

