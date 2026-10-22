// vmk_central_handler.cct / HMMickeyDetailsList / setClientElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setClientElement(_me: LingoMe, a_rUniqueElement: LingoValue) {
  setMeProp(_me, "m_rClientElement", a_rUniqueElement);
}

