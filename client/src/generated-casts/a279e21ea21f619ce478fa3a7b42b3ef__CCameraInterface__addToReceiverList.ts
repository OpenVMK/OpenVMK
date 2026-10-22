// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / addToReceiverList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addToReceiverList(_me: LingoMe, _obj: LingoValue) {
  callMethod("append", meProp(_me, "m_procedureReceiverList"), _obj)
}

